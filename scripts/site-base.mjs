// Chemin public du site. Sur GitHub Pages, un dépôt de projet est servi depuis
// https://<compte>.github.io/<dépôt>/ : la page 404, seule page dont les liens
// ne peuvent pas être relatifs, a besoin de connaître ce préfixe.
// Domaine personnalisé ou site de compte : passer --base /
export const DEFAULT_BASE = '/LesPetitsBonheurs/';

export function readBase(argv = process.argv) {
  const index = argv.indexOf('--base');
  if (index === -1) return DEFAULT_BASE;
  const value = argv[index + 1];
  if (!value?.startsWith('/')) throw new Error('--base doit commencer par « / ».');
  return value.endsWith('/') ? value : `${value}/`;
}
