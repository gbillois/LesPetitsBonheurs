'use client';
import Link from 'next/link';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  formats,
  kits,
  getKit,
  money,
  type Format,
  type Kit,
} from '@/lib/catalog';
import {
  addToCart,
  cartTotal,
  normalizeCart,
  CART_KEY,
  MAX_PRINTED,
  type CartItem,
} from '@/lib/cart';
type Shop = {
  items: CartItem[];
  ready: boolean;
  notice: string;
  storageWarning: boolean;
  add: (id: string, format: Format) => void;
  remove: (id: string, format: Format) => void;
  change: (id: string, format: Format, delta: number) => void;
  close: () => void;
};
const ShopContext = createContext<Shop | null>(null);
function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error('ShopProvider required');
  return shop;
}
export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  const state = useRef(items);
  state.current = items;
  useEffect(() => {
    try {
      setItems(
        normalizeCart(JSON.parse(localStorage.getItem(CART_KEY) || '[]')),
      );
    } catch {
      setStorageWarning(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
      } catch {
        setStorageWarning(true);
      }
  }, [items, ready]);
  const add = useCallback((id: string, format: Format) => {
    const existing = state.current.find(
      (x) => x.kitId === id && x.format === format,
    );
    setNotice(
      existing && format === 'pdf'
        ? 'Ce PDF est déjà dans votre panier.'
        : existing && existing.quantity >= MAX_PRINTED
          ? 'La quantité maximale est déjà dans le panier.'
          : 'Votre kit a été ajouté au panier.',
    );
    setItems((prev) => addToCart(prev, id, format));
    setOpen(true);
  }, []);
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: unknown,
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tools = [
      {
        name: 'read_kit_catalog',
        description: 'Lire les kits et les formats disponibles.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: () => ({
          kits: kits.map((k) => ({ id: k.id, name: k.name })),
          formats,
        }),
      },
      {
        name: 'read_cart',
        description: 'Lire le panier de kits, sans passer commande.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: () => ({
          items: state.current,
          totalCents: cartTotal(state.current),
        }),
      },
      {
        name: 'stage_kit_in_cart',
        description:
          'Ajouter un kit au panier local et ouvrir le panier. Aucun achat ni paiement.',
        inputSchema: {
          type: 'object',
          properties: {
            kitId: { type: 'string', enum: kits.map((k) => k.id) },
            format: { type: 'string', enum: Object.keys(formats) },
          },
          required: ['kitId', 'format'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input: unknown) => {
          if (!input || typeof input !== 'object')
            throw new Error('Paramètres manquants.');
          const { kitId, format } = input as { kitId: string; format: Format };
          if (!getKit(kitId) || !Object.hasOwn(formats, format))
            throw new Error('Kit ou format inconnu.');
          add(kitId, format);
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          return {
            items: state.current,
            totalCents: cartTotal(state.current),
            ordered: false,
          };
        },
      },
    ];
    for (const tool of tools) {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    }
    return () => lifecycle.abort();
  }, [add]);
  const shop: Shop = {
    items,
    ready,
    notice,
    storageWarning,
    add,
    close: () => setOpen(false),
    remove: (id, format) => {
      setItems((prev) =>
        prev.filter((x) => x.kitId !== id || x.format !== format),
      );
      setNotice('Le kit a été retiré du panier.');
    },
    change: (id, format, delta) =>
      setItems((prev) =>
        prev.map((x) =>
          x.kitId === id && x.format === format
            ? {
                ...x,
                quantity:
                  format === 'pdf'
                    ? 1
                    : Math.min(MAX_PRINTED, Math.max(1, x.quantity + delta)),
              }
            : x,
        ),
      ),
  };
  return (
    <ShopContext.Provider value={shop}>
      <a href="#contenu-principal" className="skip-link">
        Aller au contenu
      </a>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="announcement">
          À imprimer, à inventer, à recommencer.
        </div>
        <header className="header wrap">
          <Link
            href="/"
            className="brand"
            aria-label="Au petit bonheur, accueil"
          >
            Au petit
            <br />
            <span>
              bonheur<span className="brand-star">✳</span>
            </span>
          </Link>
          <nav aria-label="Navigation principale">
            <Link href="/#les-kits">Les kits</Link>
            <Link href="/#pedagogie">Grandir en jouant</Link>
            <Link href="/preparer-son-kit">Le petit guide</Link>
          </nav>
          <SheetTrigger className="cart-button">
            <ShoppingBag size={20} /> Panier{' '}
            <span>{items.reduce((sum, x) => sum + x.quantity, 0)}</span>
          </SheetTrigger>
        </header>
        {children}
        <SheetContent className="cart-sheet" showCloseButton={false}>
          <SheetClose className="close-cart" aria-label="Fermer le panier">
            <X size={22} />
          </SheetClose>
          <SheetTitle className="cart-heading">Votre petit panier</SheetTitle>
          <SheetDescription>
            De belles histoires en préparation.
          </SheetDescription>
          <CartContents />
        </SheetContent>
      </Sheet>
      <footer className="footer">
        <div className="wrap footer-inner">
          <Link className="brand" href="/">
            Au petit
            <br />
            bonheur ✳
          </Link>
          <p>
            Des petits jeux.
            <br />
            Des liens qui grandissent.
          </p>
          <div>
            <Link href="/en-classe">Pour la classe</Link>
            <Link href="/preparer-son-kit">Impression & préparation</Link>
            <Link href="/panier">Mon panier</Link>
            <span>© {new Date().getFullYear()} Au petit bonheur</span>
          </div>
        </div>
      </footer>
    </ShopContext.Provider>
  );
}
export function CartContents() {
  const { items, ready, notice, storageWarning, remove, change, close } =
    useShop();
  if (!ready) return <p>Votre panier se prépare…</p>;
  return (
    <div className="cart-contents">
      <p aria-live="polite" className="cart-notice">
        {notice}
      </p>
      {storageWarning && (
        <p className="small-note">
          Votre navigateur ne permet pas d’enregistrer le panier. Gardez cette
          page ouverte pour conserver vos choix.
        </p>
      )}
      {!items.length ? (
        <div className="empty-cart">
          <ShoppingBag size={48} strokeWidth={1} />
          <h3>Tout commence par une envie de jouer.</h3>
          <p>
            Votre panier est encore vide. Restaurant, hôtel ou spa : quelle sera
            leur prochaine histoire ?
          </p>
          <Link href="/#les-kits" onClick={close} className="button">
            Découvrir les kits <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {items.map((item) => {
              const kit = getKit(item.kitId)!;
              return (
                <article
                  className="cart-line"
                  key={`${item.kitId}-${item.format}`}
                >
                  <Link href={`/kits/${kit.id}`} onClick={close}>
                    <img src={kit.image} alt={kit.name} />
                  </Link>
                  <div>
                    <h3>{kit.name}</h3>
                    <p>{formats[item.format].label}</p>
                    <strong>
                      {money(formats[item.format].price * item.quantity)}
                    </strong>
                    <div className="quantity-line">
                      {item.format === 'printed' ? (
                        <div className="quantity">
                          <button
                            aria-label={`Diminuer la quantité de ${kit.name}`}
                            disabled={item.quantity <= 1}
                            onClick={() => change(item.kitId, item.format, -1)}
                          >
                            <Minus size={15} />
                          </button>
                          <output aria-label="Quantité">{item.quantity}</output>
                          <button
                            aria-label={`Augmenter la quantité de ${kit.name}`}
                            disabled={item.quantity >= MAX_PRINTED}
                            onClick={() => change(item.kitId, item.format, 1)}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      ) : (
                        <span className="small-note">
                          1 exemplaire numérique
                        </span>
                      )}
                      <button
                        className="remove"
                        aria-label={`Retirer ${kit.name}, ${formats[item.format].label}`}
                        onClick={() => remove(item.kitId, item.format)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cart-summary">
            <div className="total-line">
              <span>Total des articles</span>
              <strong>{money(cartTotal(items))}</strong>
            </div>
            {items.some((x) => x.format === 'printed') && (
              <p className="small-note">
                Livraison : modalités et frais à venir, non inclus dans ce
                total.
              </p>
            )}
            <div className="payment-note">
              <strong>La boutique prépare son ouverture.</strong>
              <p>
                Le paiement sera disponible prochainement. Aucune commande n’est
                passée et aucun montant n’est débité.
              </p>
            </div>
            <button className="button" disabled>
              Paiement bientôt disponible
            </button>
            <Link className="text-link" href="/#les-kits" onClick={close}>
              Continuer la découverte <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
export function Purchase({ kit }: { kit: Kit }) {
  const [format, setFormat] = useState<Format>('pdf');
  const { add, ready } = useShop();
  return (
    <div className="purchase">
      <p className="format-caption">Choisissez votre façon de jouer</p>
      <RadioGroup
        value={format}
        onValueChange={(value) => setFormat(value as Format)}
        aria-label="Format du kit"
        className="format-options"
      >
        {(Object.keys(formats) as Format[]).map((f) => (
          <label
            className={`format-option ${format === f ? 'selected' : ''}`}
            key={f}
          >
            <RadioGroupItem value={f} aria-label={formats[f].label} />
            <span>
              <b>{formats[f].label}</b>
              <small>{formats[f].description}</small>
            </span>
            <strong>{money(formats[f].price)}</strong>
          </label>
        ))}
      </RadioGroup>
      <button
        disabled={!ready}
        className="button add-button"
        onClick={() => add(kit.id, format)}
      >
        <ShoppingBag size={19} /> Ajouter au panier{' '}
        <span>{money(formats[format].price)}</span>
      </button>
      <p className="purchase-note">
        <Check size={14} /> Guide d’utilisation inclus dans les deux formats
      </p>
      <p className="small-note">
        Paiement à venir. Vous pouvez déjà préparer votre panier.
      </p>
    </div>
  );
}
export function StreetNav({ exclude }: { exclude?: string }) {
  return (
    <div className="street-nav">
      {kits
        .filter((k) => k.id !== exclude)
        .map((k) => (
          <Link href={`/kits/${k.id}`} key={k.id}>
            <span
              className="street-art"
              role="img"
              aria-label={`Illustration de la devanture : ${k.name}`}
              style={{
                backgroundPosition: `${k.illustrationPosition} center`,
                ...(k.illustrationImage
                  ? {
                      backgroundImage: `url(${k.illustrationImage})`,
                      backgroundSize: 'contain',
                    }
                  : {}),
              }}
            />
            <span>
              {k.name} <ArrowRight size={17} />
            </span>
          </Link>
        ))}
    </div>
  );
}
