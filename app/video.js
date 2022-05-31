const videoSection = document.querySelector('.about__video');
const play = document.querySelector('.about__play-img');

play.addEventListener('click', () => {
    createModal();
});

function setStyles(...prop) {
    this.style.width = prop[0];
    this.style.height = prop[1];
    this.style.position = prop[2];
    this.style.top = prop[3];
    this.style.left = prop[4];
    this.style.right = prop[5];
    this.style.backgroundColor = prop[6];
    this.style.zIndex = prop[7];
    this.style.display = prop[8];
}

function createModal() {
    const modal = document.createElement('div');

    modal.classList.add('modal');

    setStyles.call(modal, '100vw', '100vh', 'fixed', '0', '0', null, 'rgba(18,20,29, 0.8)', '100');

    videoSection.append(modal);

    const playPauseFn = createVideo(modal);
    createCancelBtn(modal, playPauseFn);
}

function createVideo(parentModal) {
    const video = document.createElement('video');

    video.setAttribute('controls', true);

    video.style.position = 'absolute';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)';   

    if (document.body.clientWidth <= 650) {
        video.style.width = '100%';
    }
    else {
        video.style.width = '50%';
        video.style.minWidth = '600px';
    }

    parentModal.append(video);

    video.src = '../video/video.mp4';

    let setPlayPauseBinded = setPlayPause.bind(null, video);
    document.addEventListener('keydown', setPlayPauseBinded);

    const mediaQueryMax650 = window.matchMedia('(max-width: 650px)');
    const mediaQueryMin660 = window.matchMedia('(min-width: 660px)');

    mediaQueryMax650.addEventListener('change', handleResizeWidth);
    mediaQueryMin660.addEventListener('change', handleResizeWidth);

    function handleResizeWidth(e) {

        if (e.media === '(max-width: 650px)') {
            video.style.width = '100%';
            video.style.minWidth = 'unset';
        }
        else if (e.media === '(min-width: 660px)') {
            video.style.width = '50%';
            video.style.minWidth = '600px';
        }
    }

    return setPlayPauseBinded;
}

function setPlayPause(video, e) {
    if (e.code === 'Space' && document.activeElement !== video) {
        e.preventDefault();
        video.paused === true ? video.play() : video.pause();
    }
}

function createCancelBtn(parentModal, playPauseFn) {
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancel-btn');

    setStyles.call(cancelBtn, '40px', '40px', 'fixed', '50px', null, '50px', 'transparent');

    parentModal.append(cancelBtn);

    cancelBtn.addEventListener('click', () => {
        document.removeEventListener('keydown', playPauseFn);
        videoSection.removeChild(parentModal);
    });

    // BARS OF CANCEL BTN

    const iconLt = document.createElement('span');
    const iconRt = document.createElement('span');

    iconLt.classList.add('cancel-btn__icon');
    iconLt.classList.add('cancel-btn__icon_lt');
    iconRt.classList.add('cancel-btn__icon');
    iconRt.classList.add('cancel-btn__icon_rt');

    cancelBtn.append(iconLt);
    cancelBtn.append(iconRt);

    const icons = document.getElementsByClassName('cancel-btn__icon');

    for (const icon of icons) {
        setStyles.call(icon, '56px', '1px', 'absolute', null, null, null, 'white', null, 'inline-block');

        if (icon.classList.contains('cancel-btn__icon_lt')) {
            icon.style.transform = 'rotate(45deg)';
            icon.style.left = '-7px';
        }
        if (icon.classList.contains('cancel-btn__icon_rt')) {
            icon.style.transform = 'rotate(-45deg)';
            icon.style.right = '-7px';
        }
    }
}