import './main.mjs';

// Show a warning if Import Maps aren't supported.
const warning = document.createElement('p');
warning.innerHTML = `Import Maps are not supported in your browser`;

warning.setAttribute('style',
    'color:red;font-weight:700;padding:1em;background:#ffc');

document.body.prepend(warning);
