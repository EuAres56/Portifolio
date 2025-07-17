// Este array irá armazenar os IDs dos setTimeout para que possamos cancelá-los
let typewriterTimeouts = [];

function clearAllTypewriterTimeouts() {
    // Percorre o array e cancela cada timeout agendado
    typewriterTimeouts.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
    // Reseta o array para que ele possa armazenar novos timeouts
    typewriterTimeouts = [];
}

// Aprimoramento da função para controlar a visibilidade dos cards de projeto
function initializeProjectsVisibility() {
    // CORRIGIDO: Procurando pela classe correta '.ver-mais-container'
    const projectsGrid = document.querySelector('.grid-projetos');
    const expandBtnContainer = document.querySelector('.ver-mais');
    if (!projectsGrid || !expandBtnContainer) return;

    const allProjects = projectsGrid.querySelectorAll('.card-projeto');
    const expandBtn = expandBtnContainer.querySelector('a');
    const cardsToShowInitially = 3;

    // Se não há cards extras para exibir, esconda o botão e retorne.
    if (allProjects.length <= cardsToShowInitially) {
        expandBtnContainer.style.display = 'none';
        return;
    }

    // Esconde todos os cards que não são os três primeiros
    for (let i = cardsToShowInitially; i < allProjects.length; i++) {
        allProjects[i].classList.add('hidden-card');
    }

    // Define o texto inicial do botão
    expandBtn.textContent = "Ver Mais";
    expandBtnContainer.style.display = 'flex'; // Garante que o botão esteja visível

    // Adiciona o evento de clique ao botão "Ver Mais"
    expandBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const isHidden = allProjects[cardsToShowInitially].classList.contains('hidden-card');

        if (isHidden) {
            // Se os cards estiverem escondidos, exibe-os
            for (let i = cardsToShowInitially; i < allProjects.length; i++) {
                // Remove a classe para exibir o card
                allProjects[i].classList.remove('hidden-card');
            }
            expandBtn.textContent = "Ver Menos";
        } else {
            // Se os cards estiverem visíveis, esconde-os
            for (let i = cardsToShowInitially; i < allProjects.length; i++) {
                // Adiciona a classe para esconder o card
                allProjects[i].classList.add('hidden-card');
            }
            expandBtn.textContent = "Ver Mais";
        }
    });
}

// Chame a nova função `initializeProjectsVisibility` dentro do seu `open_pages`
function open_pages(id_btn, id_div) {

    // NOVO: Sempre cancele as animações antes de mudar de página

    const animationTime = 300;
    const selectDiv = document.getElementById(id_div);
    const selectBtn = document.getElementById(id_btn);

    const isNotSelected = !selectBtn.classList.contains('active-tab');

    if (isNotSelected) {
        clearAllTypewriterTimeouts();
        document.querySelectorAll('.sub-box').forEach(div => {
            div.style.opacity = '0';
        });

        setTimeout(() => {
            document.querySelectorAll('.sub-box').forEach(div => {
                div.style.display = 'none';
            });

            selectDiv.style.display = 'flex';

            if (id_div === 'port-backend' || id_div === 'port-frontend') {
                initializeTechStacks();
                initializeProjectsVisibility();
            }
            if (id_div === 'port-perfil') {
                var boxSobre = document.getElementById('box-sobre');
                if (boxSobre.classList.contains('view')) { view_perfil_img() }

                clear_spans(); // Limpa o texto das spans também
                typeWriter("Olá, eu sou o", "typed-text-1", 50, () => {
                    typeWriter("Ares...", "typed-text-2", 100, () => {
                        typeWriter("Dev Full Stack: Python | Node.js | PHP | C#", "typed-text-3", 40);
                    });
                });
            }

            setTimeout(() => {
                selectDiv.style.opacity = '1';
            }, 10);
        }, animationTime);

        // Remove destaque de todos os botões
        document.querySelectorAll('.btn-navbar').forEach(btn => {
            btn.classList.remove('active-tab', 'active-red');
        });

        // Adiciona destaque ao botão selecionado
        selectBtn.classList.add('active-tab', 'active-red');
    }
}

function view_perfil_img() {
    const titulo1 = document.getElementById("typed-text-1");
    const titulo2 = document.getElementById("typed-text-2");
    const titulo3 = document.getElementById("typed-text-3");
    const imgBox = document.getElementById("img-perfil-box");
    const boxPerfil = document.getElementById("section-perfil");
    const boxSobre = document.getElementById('box-sobre')

    // Etapa 1
    titulo1.classList.toggle("hide");
    titulo2.classList.toggle("hide");
    titulo3.classList.toggle("hide");
    imgBox.classList.toggle("shrink");
    if (boxPerfil.classList.contains('move-bio-right')) {
        boxPerfil.classList.remove("move-bio-right");
        boxPerfil.classList.add("move-bio-left");
    } else {
        boxPerfil.classList.remove("move-bio-left");
        boxPerfil.classList.add("move-bio-right");
    }

    document.querySelectorAll('.sobre-texto').forEach(el => {
        el.classList.toggle('show');
    });
    boxSobre.classList.toggle("view");
}




function typeWriter(text, elementId, speed = 100, callback = null) {
    const keySound = document.getElementById("key-sound");
    const keySound2 = document.getElementById("key-sound-2");
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            const char = text.charAt(i);
            i++;
            // NOVO: Armazena o ID do setTimeout
            const timeoutId = setTimeout(typing, speed);
            typewriterTimeouts.push(timeoutId);
        } else if (callback) {
            callback();
        }
    }

    typing();
}

function clear_spans() {
    document.querySelectorAll('.typed-animation').forEach(span => {
        span.innerHTML = '';
    });
}

// NOVO: Movemos a chamada inicial para dentro de um evento DOMContentLoaded
// Isso garante que os elementos existam antes de tentar acessá-los
document.addEventListener('DOMContentLoaded', () => {
    // Inicie a animação apenas se a página 'Sobre' estiver ativa na carga inicial
    const perfilPage = document.getElementById('port-perfil');
    if (perfilPage && getComputedStyle(perfilPage).display !== 'none') {
        typeWriter("Olá, eu sou o", "typed-text-1", 50, () => {
            typeWriter("Ares...", "typed-text-2", 100, () => {
                typeWriter("Dev Full Stack: Python | Node.js | PHP | C#", "typed-text-3", 40);
            });
        });
    }
});


function initializeTechStacks() {
    // Verifique se a função já foi executada para evitar re-execuções desnecessárias
    if (window.techStacksInitialized) return;

    const techStackContainers = document.querySelectorAll('.tech-stack-container');

    techStackContainers.forEach(container => {
        const wrapper = container.querySelector('.tech-stack-wrapper');
        const prevArrow = container.querySelector('.prev-arrow');
        const nextArrow = container.querySelector('.next-arrow');

        if (!wrapper || !prevArrow || !nextArrow) {
            return;
        }

        const updateArrows = () => {
            // Se o conteúdo é menor que o container, esconda ambas as setas
            if (wrapper.scrollWidth <= wrapper.clientWidth) {
                prevArrow.classList.add('hidden-arrow');
                nextArrow.classList.add('hidden-arrow');
            } else {
                // Se o conteúdo é maior, controle a visibilidade
                prevArrow.classList.toggle('hidden-arrow', wrapper.scrollLeft <= 0);
                nextArrow.classList.toggle('hidden-arrow', wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth);
            }
        };

        // Adicionar eventos de clique para as setas
        nextArrow.addEventListener('click', () => {
            wrapper.scrollBy({
                left: 100,
                behavior: 'smooth'
            });
        });

        prevArrow.addEventListener('click', () => {
            wrapper.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
        });

        // Adicionar eventos para atualizar as setas ao rolar e redimensionar a tela
        wrapper.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);

        // Use um MutationObserver para lidar com mudanças dinâmicas no conteúdo
        const observer = new MutationObserver(updateArrows);
        observer.observe(wrapper, { childList: true, subtree: true });

        // Inicializa a visibilidade das setas
        updateArrows();
    });

    // Marca a função como executada para evitar inicializações duplicadas
    window.techStacksInitialized = true;
}