function open_sub_box(id_div, name_class_div) {
    document.querySelectorAll(name_class_div).forEach(div => {
        div.style.display = 'none';
    });
    const select_div = document.getElementById(id_div);

    select_div.style.display = 'block';

}

function view_perfil_img() {
    const img = document.getElementById('img-perfil');
    const box = document.getElementById('box-sobre');
    const animationTime = 500;

    if (img.style.display == 'block') {
        // Transforma a imagem em um retangulo
        box.style.height = '30vw';
        box.style.height = '70vh';
        box.style.borderRadius = '15px';

        img.style.height = '30vw';
        img.style.height = '70vh';
        img.style.borderRadius = '15px';

        // Espera a animação antes de ocultar e mostrar o outro
        setTimeout(() => {
            box.style.display = 'block';
            img.style.display = 'none';
            // Se necessário, remova classe do box aqui
        }, animationTime);
    } else {
        // Transforma a div e um circulo
        img.style.height = '30vw';
        img.style.width = '30vw';
        img.style.borderRadius = '50%';

        box.style.height = '30vw';
        box.style.width = '30vw';
        box.style.borderRadius = "50%";

        // Espera a animação antes de ocultar e mostrar o outro
        setTimeout(() => {
            img.style.display = 'block';
            box.style.display = 'none';
            // Se necessário, remova classe do box aqui
        }, animationTime);
    }

}
function typeWriter(text, elementId, speed = 100, callback = null) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }

    typing();
}


// Exemplo de uso:
typeWriter("Olá, eu sou o", "typed-text-1", 80, () => {
    typeWriter("Ares...", "typed-text-2", 150, () => {
        typeWriter("Dev Full Stack:  Python | Node.js | PHP | C#", "typed-text-3", 100);
    });
});