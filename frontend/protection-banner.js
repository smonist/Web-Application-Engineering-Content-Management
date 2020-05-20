customElements.define('protection-banner',
  class ProtectionBanner extends HTMLElement{
    constructor() {
      super();

      console.log('protection banner!');

      const shadow = this.attachShadow({mode: 'open'});

      const app = document.createElement('span');
      app.setAttribute('class','app');

      const appLink = document.createElement('span');
      appLink.setAttribute('class', 'appLink');

      const accept = document.createElement('span');
      accept.setAttribute('class','accept');

      const text = document.createElement('text');
      text.setAttribute('class', 'text');


       const applicationName = this.getAttribute('application-name');

      app.innerText = applicationName;

      const link = this.getAttribute('policy-link');

      appLink.innerHTML = link;

      const onAccept = this.getAttribute('on-accept');


      const banner = document.createElement('div');
      banner.setAttribute('class', 'banner');


      banner.innerHTML = 'Um Ihnen den bestmöglichen Service zu gewärhleisten speichert ' +  app.innerText + ' personenbezogene Daten.\n' +
        'Wenn Sie auf der Seite weitersurfen stimmen Sie\n' +
        'bitte der <a href=' + appLink + '>Datenschutz-Richtlinie</a>';


      const checkIfAccepted = document.createElement('button');
      checkIfAccepted.innerText = 'Ich stimme zu';

      banner.appendChild(checkIfAccepted);

      console.log(banner);
      shadow.appendChild(banner);

    }



  }
  );



