class ChooseModel extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <select class="form-select" aria-label="Default select example" id="pilih-model">
            <option value="">Pilih Model</option>
            <option value="jagung">Jagung</option>
            <option value="padi">Padi</option>
            <option value="mentimun">Mentimun</option>
            <option value="tomat">Tomat</option>
        </select>
        `;
    }
}

customElements.define('choose-model', ChooseModel);