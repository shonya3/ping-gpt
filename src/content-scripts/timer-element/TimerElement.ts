import stylesString from './style.css?inline';
import { Option } from '../../types';
const css = new CSSStyleSheet();
css.replaceSync(stylesString);

type Attr = 'value';

export class TimerElement extends HTMLElement {
	static observedAttributes: Attr[] = ['value'];
	attributeChangedCallback(name: Attr, _: Option<string>, value: Option<string>) {
		switch (name) {
			case 'value':
				if (value != null) {
					this.$span.innerText = value;
				}
				break;
		}
	}
	#shadowRoot: ShadowRoot;
	constructor() {
		super();
		if (!this.shadowRoot) {
			this.#shadowRoot = this.attachShadow({ mode: 'open' });
			this.#shadowRoot.innerHTML = String.raw`
            <span class="timer">0</span>
        `;
			this.#shadowRoot.adoptedStyleSheets = [css];
		} else this.#shadowRoot = this.shadowRoot;
	}

	static define(tag = 'timer-element') {
		customElements.define(tag, this);
	}

	get $span(): HTMLSpanElement {
		return this.#shadowRoot.querySelector('span') as HTMLSpanElement;
	}

	get value(): number {
		return Number(this.getAttribute('value')) ?? 0;
	}

	set value(val: number) {
		this.setAttribute('value', String(val));
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'timer-element': TimerElement;
	}
}
