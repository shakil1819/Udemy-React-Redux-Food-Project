window.addEventListener('DOMContentLoaded', function() {

    // Tabs   
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {       
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => { item.classList.remove('tabheader__item_active'); });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer
    const deadline = '2023-07-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else { return num; }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => { btn.addEventListener('click', openModal); });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(); }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(); }
    });

    const modalTimerId = setTimeout(openModal, 250000); // Змінив значення, щоб не відволікало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Використовуємо класи для створення карток меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }
        changeToUAH() { this.price = this.price * this.transfer; }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фітнес"',
        'Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Пісне"',
        'Меню “Пісне” - це ретельний підбір інгредієнтів: повна відсутність продуктів тваринного походження, молоко з мигдалю, вівса, кокосу чи гречки, правильну кількість білків за рахунок тофу та імпортних вегетаріанських стейків.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Преміум”',
        'У меню “Преміум” ми використовуємо не лише гарний дизайн упаковки, а й якісне виконання страв. Червона риба, морепродукти, фрукти - ресторанне меню без походу до ресторану!',
        21,
        ".menu .container"
    ).render();

    // get all forms on the page by tag
    const forms = document.querySelectorAll('form');
    const message = { // to inform users
        loading: 'img/form/spinner.svg',
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: 'Щось пішло не так...'
    };

    forms.forEach(item => { postData(item); });

    function postData(form) {
        // listen to event when trying to submit form
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // cancel standard reboot in browser

            let statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = `
                  display: block;
                  margin: 0 auto;
              `;
            form.insertAdjacentElement('afterend', statusMessage);
        

              // receive data from "inputs" 
              const formData = new FormData(form);
              const object = {};
                formData.forEach(function(value, key){ object[key] = value; });
		
      fetch('server.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object) })
			.then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); })
			.catch(() => { showThanksModal(message.failure); })
			.finally(() => { form.reset(); });
        });
    };
			
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
          prevModalDialog.classList.add('hide');
          openModal();

        const thanksModal = document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

});
