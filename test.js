function getStartAndEndOfWeek(date) {
    const currentDate = date ? new Date(date) : new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week (Sunday)
  
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Saturday)
  
    return { startOfWeek, endOfWeek };
  }
  
  const today = new Date();
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(today);
  
  console.log("Start of the week:", startOfWeek);
  console.log("End of the week:", endOfWeek);
  