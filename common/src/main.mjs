console.log(`Executing module 'main.mjs'`);

async function main() {
  // Use dynamic import to mimic conditional loading dependencies.
  import('./dep1.mjs');
  import('./dep2.mjs');
  import('./dep3.mjs');
}

main().catch(console.error);
