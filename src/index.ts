import type { ShadowRootInit } from './interface';

import innerHtml from './template.html';

let template = document.createElement('template');

template.innerHTML = innerHtml;

class LoginWidget extends HTMLElement {
  shadow!: ShadowRootInit;

  shadowDOM!: ShadowRoot;

  emailEl!: HTMLInputElement;

  passwordEl!: HTMLInputElement;

  loginBtn!: HTMLButtonElement;

  login = new CustomEvent('login', {
		detail: {
			email: '',
			password: '',
		},
	});;

  constructor() {
    super();
  }

  doLogin = (): void => {
		this.login.detail.email = this.emailEl.value;
    this.login.detail.password = this.passwordEl.value;
    this.dispatchEvent(this.login);
  }
	
  connectedCallback(): void {
		this.shadow = this.attachShadow({ mode: 'open' });
		
    if (this.shadowRoot) {
			this.shadowDOM = this.shadowRoot;
    }
		
    this.shadowDOM.appendChild(template.content.cloneNode(true));
		
    this.emailEl = this.shadowDOM.querySelector('input.email')!;
    this.passwordEl = this.shadowDOM.querySelector('input.password')!;
    this.loginBtn = this.shadowDOM.querySelector('button.login')!;

    this.loginBtn.addEventListener('click', this.doLogin);
  }
}
window.customElements.define('login-widget', LoginWidget);