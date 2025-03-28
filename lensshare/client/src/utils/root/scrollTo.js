const scrollTo = (id) => {
  return document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
export default scrollTo;
