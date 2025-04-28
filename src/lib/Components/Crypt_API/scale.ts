export function scale([domainMin, domainMax], [rangeMin, rangeMax]){

const scaleFactor = (rangeMax - rangeMin) / (domainMax - domainMin);
return (value: number) => rangeMin + (value - domainMin)*scaleFactor;
}
