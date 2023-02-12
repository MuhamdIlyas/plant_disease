import './choose-img';
import './choose-model';
import './classify-img';
import './classify-advice';

class ClassifySection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <h3 class="card-title hr-title">
                <i class="fas fa-expand"></i>
                Klasifikasikan
            </h3>
        `;  
        const chooseModelElement = document.createElement('choose-model');
        chooseModelElement.classList.add('mb-5');
        this.appendChild(chooseModelElement);

        const chooseImgElement = document.createElement('choose-img');
        chooseImgElement.classList.add('col-lg-6', 'col-md-6', 'col-12', 'mb-5');
        this.appendChild(chooseImgElement);

        const classifySectionElement = document.createElement('classify-result');
        const classifyImgElement = document.createElement('classify-img');
        const classifyAdviceElement = document.createElement('classify-advice');
        classifySectionElement.classList.add('col-lg-6', 'col-md-6', 'col-12', 'mb-5');
        classifySectionElement.setAttribute('id', 'hasil-klasifikasi');
        classifySectionElement.appendChild(classifyImgElement);
        classifySectionElement.appendChild(classifyAdviceElement);
        this.appendChild(classifySectionElement);
    }
}

customElements.define('classify-section', ClassifySection);