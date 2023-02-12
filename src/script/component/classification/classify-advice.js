class ClassifyAdvice extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-success btn-block mt-2 w-100" 
                id="btn-advice"
                style="display: none;"
            >
                Saran Penyembuhan
            </a>
        `;
    }
}

customElements.define('classify-advice', ClassifyAdvice);