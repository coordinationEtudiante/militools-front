function refreshNeeds(initialDate: Date = new Date(0)) {
  return Date.now() - initialDate.getTime() > 900_000
}

export { refreshNeeds }
