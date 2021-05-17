document.addEventListener('DOMContentLoaded', function () {
	//Open left menu
	document.querySelector('.header__button--burger').addEventListener('click', () => {
		document.body.classList.add('left-menu--opening');
		setTimeout(() => {
			document.body.classList.add('left-menu--opened');
		}, 10);
	})

	// Close left menu
	document.querySelector('.left-menu__close').addEventListener('click', () => {
		document.body.classList.remove('left-menu--opened');
		setTimeout(() => {
			document.body.classList.remove('left-menu--opening');
		}, 1000);
	})

	//Show policy
	document.querySelector('.left-menu__link--policy').addEventListener('click', () => {
		document.querySelector('.policy').classList.remove('d-none');
	})

	//Hide policy
	document.querySelector('.policy__close').addEventListener('click', () => {
		document.querySelector('.policy').classList.add('d-none');
	})

	// Audio button ON/OFF
	const audioButton = document.querySelector('.audio-button');
	if (audioButton) {
		audioButton.addEventListener('click', () => {
			audioButton.classList.toggle('audio-button--disabled')
		})
	}
});