document.addEventListener("DOMContentLoaded", () => {
	const viewEvent = new Event('InViewEvent');
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (!entry.target.classList.contains('InView')) {
					entry.target.dispatchEvent(viewEvent);
					entry.target.classList.add('InView');
				}
			}
		});
	});
	const allAnimatedElements = document.querySelectorAll('.DetectInView');
	allAnimatedElements.forEach((element) => observer.observe(element));
}); 