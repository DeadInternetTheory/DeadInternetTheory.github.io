const viewportHeight = window.innerHeight;
const scrollY = window.scrollY;
const { top, height } = element.getBoundingClientRect();

const bottom = top + height;
const viewportCenter = viewportHeight / 2;
const scrollCenterPosition = scrollY + viewportCenter;
const elementTopAbsolutePosition = top + scrollY;
const elementBottomAbsolutePosition = bottom + scrollY;

const bodyProximityToCenter = (
    Math.min(scrollCenterPosition, elementTopAbsolutePosition) / elementTopAbsolutePosition
) / (
        Math.max(scrollCenterPosition, elementBottomAbsolutePosition) / elementBottomAbsolutePosition
    );

console.table([
    ["bodyProximityToCenter", bodyProximityToCenter]
]);