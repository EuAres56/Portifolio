function open_sub_box(id_div, name_class_div) {
    document.querySelectorAll(name_class_div).forEach(div => {
        div.style.display = 'none';
    });
    const select_div = document.getElementById(id_div);

    select_div.style.display = 'block';

}