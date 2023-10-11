document.addEventListener('DOMContentLoaded', () => {
    const myBtn = document.getElementById('myBtn');
    const spoiler = document.getElementById('spoiler');

    let isButtonEnabled = false;
    myBtnClick();
    EscClick();
    

    function myBtnClick() {
        myBtn.addEventListener('click', () => {
            if (!isButtonEnabled) {
                isButtonEnabled = true;
                spoiler.classList.remove('closed');
            } else {
                isButtonEnabled = false;
                spoiler.classList.add('closed');
            }
        })
    }

    function EscClick() {
        document.addEventListener('keydown', (event) => {
            if (isButtonEnabled && event.key === 'Escape') {
                isButtonEnabled = false;
                spoiler.classList.add('closed');
            }
        })
    }

})