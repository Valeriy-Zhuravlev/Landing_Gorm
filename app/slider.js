const sliderTape = document.querySelector('.slider__tape');
const sliderTapeArray = Array.from(sliderTape.children);

const paginationList = document.querySelector('.slider__pagination');
const paginationArray = Array.from(paginationList.children);

let currentOffset = 0;

function next() {
    const slideWidth = document.querySelector('.slider__item').offsetWidth;
    const maxOffSet = -slideWidth * (sliderTapeArray.length - 1);
    currentOffset -= slideWidth;

    if (currentOffset <= maxOffSet ) {
        currentOffset = maxOffSet;
    }

    sliderTape.style.transform = `translateX(${currentOffset}px)`;
    changeSelectedNext();
    setPagination();
};

function prev() {
    const slideWidth = document.querySelector('.slider__item').offsetWidth;
    currentOffset += slideWidth;

    if (currentOffset >= 0) { currentOffset = 0 }

    sliderTape.style.transform = `translateX(${currentOffset}px)`;
    changeSelectedPrev();
    setPagination();
};

function changeSelectedNext() {
    const selectedSlideIndex = getSelectedSlideIndex();

    if (selectedSlideIndex == sliderTapeArray.length - 1) return;

    sliderTapeArray[selectedSlideIndex].classList.remove('active');

    const nextSlideIndex = +selectedSlideIndex + 1;
    sliderTapeArray[nextSlideIndex].classList.add('active');
}

function changeSelectedPrev() {
    const selectedSlideIndex = getSelectedSlideIndex();

    if (selectedSlideIndex == 0) return;

    sliderTapeArray[selectedSlideIndex].classList.remove('active');

    const prevSlideIndex = +selectedSlideIndex - 1;
    sliderTapeArray[prevSlideIndex].classList.add('active');
}

function getSelectedSlideIndex() {

    for(let i = 0; i < sliderTapeArray.length; i++) {
        if ( sliderTapeArray[i].classList.contains('active') ) {
            return i;
        }
    }

}

function setPagination() {
    const selectedSlideIndex = getSelectedSlideIndex();
    let selectedPaginationIndex = selectedSlideIndex;
     
    for(let pagination of paginationArray) {
        pagination.classList.remove('active');
    }

    paginationArray[selectedPaginationIndex].classList.add('active');
}


function getSelectedPaginationIndex() {

    for (let i = 0; i < paginationArray.length; i++) {
        if (paginationArray[i].classList.contains('active') ) {
            return i;
        }        
    }

}

paginationList.onclick = (event) => {
    if (!event.target.classList.contains('slider__pagination-item')) return;

    const prevPaginationIndex = getSelectedPaginationIndex();

    let pagination = event.target;
    let paginationIndex = paginationArray.indexOf(pagination);
    
    
    for(let pagination of paginationArray) {
        pagination.classList.remove('active');
    }

    pagination.classList.add('active');

    const slideWidth = document.querySelector('.slider__item').offsetWidth;
    currentOffset -= slideWidth * (paginationIndex - prevPaginationIndex);

    sliderTape.style.transform = `translateX(${currentOffset}px)`;


    let prevSelectedSlideIndex = getSelectedSlideIndex();
    sliderTapeArray[prevSelectedSlideIndex].classList.remove('active');

    let selectedSlideIndex = -(currentOffset / slideWidth);
    sliderTapeArray[selectedSlideIndex].classList.add('active');

}

setInterval( () => {
    let selectedSlideIndex = getSelectedSlideIndex();
    
    if (selectedSlideIndex == sliderTapeArray.length - 1) {
        sliderTapeArray[selectedSlideIndex].classList.remove('active');

        currentOffset = 0;
        sliderTape.style.transform = `translateX(${currentOffset}px)`;
        sliderTapeArray[0].classList.add('active');

        const paginationIndex = getSelectedPaginationIndex();
        paginationArray[paginationIndex].classList.remove('active');
        paginationArray[0].classList.add('active');

        return;
    };

    next();
}, 5000);