class CookieBanner extends HTMLElement {
  connectedCallback() {
    const applicationName = this.getAttribute('application-name');
    const policylink = this.getAttribute('policy-link');

    const accept = localStorage.getItem('cookies');

    if (!accept) {
      this.style.cssText = `
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		backdrop-filter: blur(4px);
		padding: 10px;
		z-index: 100000;
	`;

      this.innerHTML = `
        <div id="text">
            Um Ihnen den bestmöglichen Service zu gewähleisten speichert <strong>${applicationName}</strong>
            personenbezogene Daten. Wenn Sie auf der Seite weitersurfen stimmen Sie bitte der 
			<a href="${policylink}">Datenschutz-Richtlinie</a> zu.
			
			<button id="accept">Accept</button>
		</div>
		`;

      document.getElementById('text').style.cssText = `
		max-width: 500px;
		background-color: white;
	`;

      document.getElementById('accept').addEventListener('click', () => {
        this.style.cssText = `display: none;`;
        let event = new Event('on-accept');
        this.dispatchEvent(event);
      });
    }
  }
}

customElements.define('cookie-banner', CookieBanner);
