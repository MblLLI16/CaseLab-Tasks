document.addEventListener('DOMContentLoaded', () => {
    let isButtonEnabeled = false;

    const myBtn = document.getElementById('myBtn');
    const spoiler = document.getElementById('spoiler');

    myBtnClick();
    EscClick();

    function myBtnClick() {

        myBtn.addEventListener('click', () => {
            if (!isButtonEnabeled) {
                isButtonEnabeled = true;
                spoiler.classList.remove('closed');
            } else {
                isButtonEnabeled = false;
                spoiler.classList.add('closed');
            }
        })
    }

    function EscClick() {
        document.addEventListener('keydown', (event) => {
            if (isButtonEnabeled && event.key === 'Escape') {
                isButtonEnabeled = false;
                spoiler.classList.add('closed');
            }
        })
    }

})




