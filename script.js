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
    const imgIsVisible = getComputedStyle(img).display === 'block';

    if (imgIsVisible) {
        // Deixar ambos com aparência de retângulo antes da troca
        [img, box].forEach(el => {
            el.style.width = '30vw';
            el.style.height = '70vh';
            el.style.borderRadius = '15px';
        });

        setTimeout(() => {
            box.style.display = 'block';
            img.style.display = 'none';
        }, animationTime);
    } else {
        // Deixar ambos com aparência circular antes da troca
        [img, box].forEach(el => {
            el.style.width = '30vw';
            el.style.height = '30vw';
            el.style.borderRadius = '50%';
        });

        setTimeout(() => {
            img.style.display = 'block';
            box.style.display = 'none';
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
