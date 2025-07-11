export function getRandomNumber(length) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
}

export function getRandomAlphanumeric(prefix, length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = prefix;
  for (let i = prefix.length; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getRandomUserFieldTexts() {
  const texts = [
    "Custom Message for User Field 1",
    "Personalized Input for User Field 3",
    "User-Specific Text for Field 5",
    "Unique Label for User Field 6",
    "Tailored Content for Field 2",
    "Custom Data for User Field 9",
    "Special Information for Field 8",
    "Field 2 Updated with New Text",
    "Custom Input for Field 9",
    "Personalized Content for User Field 10",
  ];

  // Select a random text for each field
  return {
    randomText1: texts[Math.floor(Math.random() * texts.length)],
    randomText2: texts[Math.floor(Math.random() * texts.length)],
  };
}
export function getRandomCustomer() {
  const customers = [
    "Saad",
    "Ali2952",
    "Ahmed3780",
    "Sara3840",
    "John Doe",
    "Emily1240",
    "Michael1480",
    "Saad2503",
    "Michael5171",
    "Sophia2336",
  ];
  return customers[Math.floor(Math.random() * customers.length)];
}
export function getRandomAddress() {
  const customersAddresses = [
    "Saad",
    "Ali2952",
    "Ahmed3780",
    "Sara3840",
    "John Doe",
    "Emily1240",
    "Michael1480",
    "Saad2503",
    "Michael5171",
    "Sophia2336",
  ];

  const streetAddresses = [
    "Suite 101",
    "Apt 12B",
    "Floor 3, Office 42",
    "Building A, Room 5",
    "Penthouse 1",
    "Warehouse 6, Unit 4",
    "Suite 302",
    "Office 214",
  ];

  const secondaryAddresses = [
    "Main Street",
    "Downtown Plaza, Level 2",
    "Tech Park 5",
    "Westside Complex, Block B",
    "Innovation Hub, Room 401",
    "Research Facility, Lab 22",
    "Skyline Tower, 10th Floor",
    "Business Center, Suite 9",
  ];

  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ];

  const zipCodes = [
    "10001",
    "90001",
    "60601",
    "77001",
    "85001",
    "19101",
    "78201",
    "92101",
  ];

  const phoneNumbers = [
    "(212) 555-1234",
    "(323) 555-5678",
    "(312) 555-8765",
    "(713) 555-4321",
    "(602) 555-6789",
    "(215) 555-3456",
    "(210) 555-7890",
    "(619) 555-2345",
  ];

  return {
    customers:
      customersAddresses[Math.floor(Math.random() * customersAddresses.length)],

    street: streetAddresses[Math.floor(Math.random() * streetAddresses.length)],
    secondary:
      secondaryAddresses[Math.floor(Math.random() * secondaryAddresses.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    state: " ",
    country: " ",
    zip: zipCodes[Math.floor(Math.random() * zipCodes.length)],
    phone: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
  };
}
export function getRandomContactInfo() {
  const names = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "Chris",
    "Emily",
    "David",
    "Sophia",
    "James",
    "Olivia",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
  ];
  const emailProviders = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
  ];

  const phoneNumbers = [
    "(501) 555-1000",
    "(501) 555-2000",
    "(501) 555-3000",
    "(501) 555-4000",
    "(501) 555-5000",
  ];
  const faxNumbers = [
    "(501) 555-6000",
    "(501) 555-7000",
    "(501) 555-8000",
    "(501) 555-9000",
  ];

  return {
    phone: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
    fax: faxNumbers[Math.floor(Math.random() * faxNumbers.length)],
    contact: `${names[Math.floor(Math.random() * names.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    title: "Customer Manager", // Can be random as well if needed
    email: `${Math.random().toString(36).substring(7)}${
      emailProviders[Math.floor(Math.random() * emailProviders.length)]
    }`,
  };
}
// Existing functions stay the same...

// New function to fill address and contact details
export function fillRandomCustomerDetails(customerPage, customerEditorPage) {
  const randomAddress = getRandomAddress();
  customerPage.clickEditAddressButton();
  customerPage.verifyEditAddressText();
  customerEditorPage.fillAddressInfo(
    randomAddress.street,
    randomAddress.secondary,
    randomAddress.city,
    randomAddress.state,
    randomAddress.country,
    randomAddress.zip,
    randomAddress.phone
  );

  const randomContactInfo = getRandomContactInfo();
  customerEditorPage.fillAdditionalContactInfo(
    randomContactInfo.phone,
    randomContactInfo.fax,
    randomContactInfo.contact,
    randomContactInfo.title,
    randomContactInfo.email
  );
}
export function fillRandomCustomersDetails(customerPage, customerEditorPage) {
  const randomAddress = getRandomAddress();
  customerPage.clickEditAddressButton();
  customerPage.verifyEditAddressText();
  customerEditorPage.fillAddressInfos(
    randomAddress.customers,
    randomAddress.street,
    randomAddress.secondary,
    randomAddress.city,
    randomAddress.state,
    randomAddress.country,
    randomAddress.zip,
    randomAddress.phone
  );
}

export function getRandomBusinessUnit() {
  const businessUnits = [
    "Global",
    "East Coast",
    "Central",
    "Mountain",
    "West Coast",
    "Canada",
    "new one",
    "New-Business Unit",
    "test autoassignment",
    "test qa test",
    "chaz_test",
    "Regression Test",
    "CXT Software 2",
    "Christy ID Test Christy ID Test Column Width Test2",
  ];

  const randomIndex = Math.floor(Math.random() * businessUnits.length);
  return businessUnits[randomIndex];
}
export function getRandomCustomerType() {
  const customerTypes = [
    "Test",
    "Boring",
    "QA Test",
    "Test 2",
    "Lab",
    "on demand",
    "XD29216",
    "Type 9",
    "Test",
  ];

  const randomIndex = Math.floor(Math.random() * customerTypes.length);
  return customerTypes[randomIndex];
}
export function getRandomCustomerSource() {
  const customerSources = [
    "Phone Directory",
    "Web",
    "Cold Call",
    "Advertisement",
    "Sewer",
    "AI",
    "Cem",
    "Test Customer Source",
  ];

  const randomIndex = Math.floor(Math.random() * customerSources.length);
  return customerSources[randomIndex];
}
//
export function getRandomTabSelection() {
  const tabsToSelect = [
    "Allow Customer Address Points",
    "Weight Required",
    "Pieces Required",
    "Require Parcel Dimensions (Client Portal)",
    "Service Type Required",
    "Require Status Code when Time Window Changes",
    "Update Pieces and Weight by Parcels",
    "POD Required",
    "Signature Required",
    "VPOD Required",
    "Camera Required",
  ];
  return tabsToSelect[Math.floor(Math.random() * tabsToSelect.length)];
}
export function getRandomTab() {
  const tabs = [
    "Allow Customer Address Points",
    "Weight Required",
    "Pieces Required",
    "Require Parcel Dimensions (Client Portal)",
    "Service Type Required",
    "Require Status Code when Time Window Changes",
    "Update Pieces and Weight by Parcels",
    "POD Required",
    "Signature Required",
    "VPOD Required",
    "Camera Required",
  ];

  const randomIndex = Math.floor(Math.random() * tabs.length);
  return tabs[randomIndex];
}
export function getRandomForceLocationScanOption() {
  const options = ["None", "Upon Arrival", "Upon Departure", "Both"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomForceLocationScanDeliveryOption() {
  const options = ["None", "Upon Arrival", "Upon Departure", "Both"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomOriginCaption() {
  const options = ["Origin", "Shipper", "Pickup", "From"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomComment() {
  const comments = [
    "Great place to visit!",
    "Nice weather and good food.",
    "I had an amazing experience!",
    "Would love to come back again.",
    "A hidden gem for travelers.",
    "Fantastic service and friendly staff.",
    "Beautiful scenery and relaxing vibe.",
    "An unforgettable trip!",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}
export function getRandomServiceOrVehicleType() {
  const options = ["Service Type", "Vehicle Type"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomDefaultServiceType() {
  const defaultServiceTypes = [
    "new",
    "On Demand",
    "Out of Town",
    "Car",
    "Van",
    "Contract",
    "Trucker",
    "Floral",
    "Line-Haul",
    "Standard Courier",
    "Medical",
    "Refridgerated Truck",
    "Pallets",
    "Live Animal",
    "Ground Shipping",
    "Service Type Test",
    "Dead Animal",
  ];

  const randomIndex = Math.floor(Math.random() * defaultServiceTypes.length);
  return defaultServiceTypes[randomIndex];
}
export function getRandomDefaultOrderType() {
  const defaultOrderTypes = [
    "Mileage Rates",
    "Zones Rate",
    "Percentage Rate",
    "Weight Rate",
    "GeoZone",
    "Rush",
    "Distance Fallback-Rapidship",
    "Order type homework on demand",
    "Standard Miles Restricted",
    "Long Haul w/Time Adj",
    "Blast Direct RSR",
    "Doug All Day w/ Req",
    "Doug All Day w/o Req",
  ];

  const randomIndex = Math.floor(Math.random() * defaultOrderTypes.length);
  return defaultOrderTypes[randomIndex];
}
export function getRandomImageFileConversion() {
  const imageFileConversions = [
    "No Conversion",
    "JPG",
    "PDF",
    "PNG",
    "TIF",
    "BMP",
  ];
  const randomIndex = Math.floor(Math.random() * imageFileConversions.length);
  return imageFileConversions[randomIndex];
}
export function getRandomReminderText() {
  const reminders = [
    "Follow up with the client on order status",
    "Verify shipment dimensions before dispatch",
    "Check for any special instructions from the customer",
    "Confirm payment status before proceeding",
    "Notify logistics team for urgent deliveries",
  ];
  return reminders[Math.floor(Math.random() * reminders.length)];
}
export function getRandomDispatchPriority() {
  const dispatchPriorityOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const randomIndex = Math.floor(
    Math.random() * dispatchPriorityOptions.length
  );
  return dispatchPriorityOptions[randomIndex];
}

export function getRandomDriverNote() {
  const notes = [
    "Handle packages with care, fragile items inside",
    "Ensure to get signature upon delivery",
    "Double-check the address before dispatching",
    "Contact the recipient if no one is home",
    "Follow the special instructions provided by the customer",
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}
export function getRandomRouteComment() {
  const comments = [
    "Deliver via main gate only",
    "Avoid narrow streets during peak hours",
    "Leave package with the front desk if no one is available",
    "Use the back entrance for loading",
    "Confirm route with dispatcher before departure",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}
export function getRandomSignatureText() {
  const texts = [
    "Please sign here to confirm delivery",
    "Signature required for package release",
    "By signing, you agree to the delivery terms",
    "Sign to acknowledge package receipt",
    "Customer signature confirms delivery accuracy",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}
export function getRandomDistanceUnit() {
  const units = ["Mile", "Kilometer"];
  return units[Math.floor(Math.random() * units.length)];
}

export function getRandomCaption(fieldNumber) {
  const captions = [
    `Random caption for User Field ${fieldNumber}`,
    `User Field ${fieldNumber} - Custom Text`,
    `Generated Caption ${fieldNumber}`,
    `Field ${fieldNumber} Placeholder`,
    `Unique Caption ${fieldNumber}`,
  ];

  return captions[Math.floor(Math.random() * captions.length)];
}
export function getRandomNum() {
  const phoneNumbers = [
    "(212) 555-1234",
    "(323) 555-5678",
    "(312) 555-8765",
    "(713) 555-4321",
    "(602) 555-6789",
    "(215) 555-3456",
    "(210) 555-7890",
    "(619) 555-2345",
  ];
  return phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
}
export function getFaxNum() {
  const phoneNumbers = [
    "(212) 555-1234",
    "(323) 555-5678",
    "(312) 555-8765",
    "(713) 555-4321",
    "(602) 555-6789",
    "(215) 555-3456",
    "(210) 555-7890",
    "(619) 555-2345",
  ];
  return phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
}
export function getRandomEmail() {
  const emailOptions = [
    "testuser1@example.com",
    "demo.account@example.com",
    "contact.support@example.com",
    "john.doe@example.com",
    "jane.doe@example.com",
    "random.email@example.com",
    "primary.user@example.com",
    "automation.test@example.com",
  ];

  const randomIndex = Math.floor(Math.random() * emailOptions.length);
  return emailOptions[randomIndex];
}

export const getRandomAccountStatus = () => {
  const accountStatusOptions = [
    "Active",
    "Inactive",
    "Past Due",
    "Credit Hold",
    "Blacklisted",
    "Prospect",
  ];
  return accountStatusOptions[
    Math.floor(Math.random() * accountStatusOptions.length)
  ];
};
export const getRandomVerificationOption = () => {
  const verificationOptions = [
    "Invoicing",
    "Settlements",
    "Invoicing and Settlements",
  ];
  return verificationOptions[
    Math.floor(Math.random() * verificationOptions.length)
  ];
};
export const getRandomInvoiceOption = () => {
  const invoiceOptions = [
    "Standard Invoice",
    "Reference Sort",
    "Billing Group Sort",
    "XD-10142 (1)",
    "XD 30306",
    "Test Dave",
    "Dave Test 2",
    "Dave Test 3",
  ];
  return invoiceOptions[Math.floor(Math.random() * invoiceOptions.length)];
};
export const getRandomEmailInvoiceFormat = () => {
  const emailInvoiceFormats = [
    "Data spreadsheet",
    "Use print format",
    "Use custom invoice export",
    "Use print and custom invoice formats",
  ];
  return emailInvoiceFormats[
    Math.floor(Math.random() * emailInvoiceFormats.length)
  ];
};
export const getRandomBillingCycle = () => {
  const billingCycleOptions = [
    "Daily",
    "Weekly",
    "Bi-Weekly",
    "Test2",
    "Monthly",
    "whatever cycle",
    "Test7",
    "Test8",
    "Test9 Plus",
    "Blast Billing",
    "Test11",
    "Billy's Billing 2",
    "chaz_test",
    "Test test test Name",
    "every minute'",
    "Test52",
  ];
  return billingCycleOptions[
    Math.floor(Math.random() * billingCycleOptions.length)
  ];
};
export const getRandomBaseRateChartOption = () => {
  const baseRateChartOptions = [
    "1 - Standard Rates",
    "2 - Flat Rate for Credit Cards",
    "11 - Default Stamp Rate Chart Test",
    "25 - Advanced Fall Back",
  ];
  return baseRateChartOptions[
    Math.floor(Math.random() * baseRateChartOptions.length)
  ];
};
export const getRandomItemRateChartOption = () => {
  const itemRateChartOptions = [
    " 1 - Standard Accessorials ",
    " 27 - Overtime Test ",
    " 99 - override ",
    " 100 - Christy's SoapUI Item Testing ",
    " 101 - Christy's Rate Chart Error Testing ",
    " 103 - Christy Driver Pay Items ",
    " 104 - TEST ITEMS ",
    " 106 - DougTestItemsChart ",
    " 200 - new items ",
    " 222 - RegTest ",
  ];
  return itemRateChartOptions[
    Math.floor(Math.random() * itemRateChartOptions.length)
  ];
};
export function getRandomItemOption() {
  const options = [
    " 1 - Standard Accessorials ",
    " 27 - Overtime Test ",
    " 200 - new items ",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomSurchargeOption() {
  const options = [
    " 1 - Standard FSC ",
    " 10 - Christy's SoapUI Surcharge Testing ",
    " 22 - 22 ",
    " 27 - Overtime Test ",
    " 100 - Christy's SoapUI Surcharge Testing ",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomNumbers() {
  const numbers = [2, 16, 20];
  return numbers[Math.floor(Math.random() * numbers.length)];
}
export function getRandomMileNumbers() {
  const numbers = [6, 17, 22];
  return numbers[Math.floor(Math.random() * numbers.length)];
}

export function getRandomCardNumber() {
  const cardNumbers = [
    "4111111111111111",
    "5500000000000004",
    "340000000000009",
    "6011000000000004",
  ];
  return cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
}

export function getRandomExpiryMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[Math.floor(Math.random() * months.length)];
}
export function getRandomExpiryYear() {
  const years = ["2025", "2026", "2027", "2028", "2029", "2030"];
  return years[Math.floor(Math.random() * years.length)];
}
export function getRandomSecurityCode() {
  return Math.floor(1000 + Math.random() * 9000);
}
export function getRandomCardHolderName() {
  const names = ["John Doe", "Jane Smith", "Michael Brown", "Emily Johnson"];
  return names[Math.floor(Math.random() * names.length)];
}
export function generateRandomAddress() {
  const addresses = [
    "123 Main St, New York, NY",
    "456 Oak Ave, Los Angeles, CA",
    "789 Pine Rd, Chicago, IL",
    "101 Maple Ln, Houston, TX",
  ];
  return addresses[Math.floor(Math.random() * addresses.length)];
}
export function generateRandomPostalCode() {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a 5-digit postal code
}
export function getRandomContactName() {
  const names = ["Emma", "Jackson", "Ava", "Lucas", "Amelia"];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomTitle() {
  const titles = ["Manager", "Developer", "Designer", "Analyst"];
  return titles[Math.floor(Math.random() * titles.length)];
}

export function getRandomCompany() {
  const companies = [
    "Tech Solutions",
    "InnoSoft",
    "Cloud Corp",
    "Data Dynamics",
  ];
  return companies[Math.floor(Math.random() * companies.length)];
}
export function getRandomPhoneNumber() {
  const phoneNumbers = [
    "6022669708", // Fixed number
  ];

  const randomIndex = Math.floor(Math.random() * phoneNumbers.length);
  return phoneNumbers[randomIndex];
}
export function getRandomFaxNumber() {
  return `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

export function getRandomStatusEvent() {
  const statusEvents = [
    "Inet User Approved",
    "Order - Invoiced",
    "New Internet User",
    "Order - Address Changed",
    "Order - Consolidated",
    "Order - Dispatched/Assigned",
    "Order - Driver Unassigned",
    "Order - Placed",
    "Order - Parcel Exception Added",
    "Order - Status Code Added",
    "Order - Status Code Updated",
    "Order - POD",
    "Order - Attachment Added",
    "Order - At Delivery",
    "Order - At Pickup",
    "Order - Cancelled",
    "Order - Delivered",
    "Order - ETA Update",
    "Order - Next Delivery",
    "Order - Next Pickup",
    "Order - Parcel Overage Scan",
    "Order - Picked Up",
    "Order - Rejected By Driver",
    "Order - Rate Change",
    "Order - Received At Dock",
    "Order - Delivery Signature",
    "Order - Verified for Billing",
  ];

  return statusEvents[Math.floor(Math.random() * statusEvents.length)];
}
export function getRandomMessageFormat() {
  const messageFormats = [
    "HTML EXAMPLE",
    "Customer Route",
    "X-Internet",
    "Order Del - test",
    "New Internet User",
    "Consolidated-OD",
    "Consolidated - Routed",
    "Copy of HTML EXAMPLE",
    "Test Route Date Formats",
    "Route Stop - Signature",
    "Route Stop - POD",
  ];

  // simulate checking all options (optional console logging)
  messageFormats.forEach((format) => {
    console.log("Checking:", format);
  });

  // finally select the one you want
  return "X-Internet";
}
export function getRandomMessageType() {
  const messageTypes = ["X Internet"];
  return messageTypes[Math.floor(Math.random() * messageTypes.length)];
}
export function getRandomDateFormat() {
  const dateFormats = [
    "ddd mm/dd/yy h:nn AM/PM",
    "mm/dd/yy",
    "mm/dd/yyyy",
    "mm/dd/yy h:nn AM/PM",
    "hh:nn",
  ];
  return dateFormats[Math.floor(Math.random() * dateFormats.length)];
}
export function getRandomName() {
  const names = ["Asad-New1122", "Saad-New1122"];
  return `${names[Math.floor(Math.random() * names.length)]}`;
}

export function getRandomEmailAddress() {
  const emailOptions = ["cxtappdev@msdncxtsoftware.onmicrosoft.com"];

  const randomIndex = Math.floor(Math.random() * emailOptions.length);
  return emailOptions[randomIndex];
}
export function getRandomMessageSubject() {
  const subjects = ["[PKID] - Consolidated"];
  return subjects[Math.floor(Math.random() * subjects.length)];
}
export function getRandomDelay() {
  return Math.floor(Math.random() * 300) + 1; // Random delay between 1 and 300 seconds
}
export function getRandomDriverPrompt() {
  const prompts = [
    "Deliver to back door",
    "Call before arrival",
    "Leave package at reception",
    "Signature required",
    "Handle with care",
    "Fragile items inside",
    "Ring bell upon arrival",
    "Use side entrance",
    "Verify ID before delivery",
    "Contactless drop-off",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
export function getRandomRouteEvent() {
  const events = ["Pickup", "Delivery"];
  return events[Math.floor(Math.random() * events.length)];
}

export function getRandomDeliveryInstruction() {
  const prompts = [
    "Knock twice",
    "Avoid driveway",
    "Service entrance only",
    "Drop by garage",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
export function getRandomStopType() {
  const stopTypes = [
    "All Stop Types",
    "Pickup",
    "Delivery",
    "Exchange",
    "Meet",
    "Flight",
    "Start",
    "End",
    "Returns",
    "Stolen",
    "Drone Interception",
    "sdgfsgs",
    "test",
    "Test2",
    "Stop",
    "New Stop Type",
    "QA Test",
    "Contracts",
    "Test 100",
  ];
  return stopTypes[Math.floor(Math.random() * stopTypes.length)];
}
export function getRandomEvents() {
  const events = ["Arrived", "Completed"];
  return events[Math.floor(Math.random() * events.length)];
}
export function getRandomInputType() {
  const inputTypes = [
    "Toggle",
    "Numeric Only",
    "Text",
    // "Camera Only Photo",
    "Camera or Gallery Photo",
  ];
  return inputTypes[Math.floor(Math.random() * inputTypes.length)];
}
export function getRandomNoteType() {
  const noteTypes = ["Bill Note", "Phone Note", "Email Note"];
  const index = Math.floor(Math.random() * noteTypes.length);
  return noteTypes[index];
}
export function getRandomTaskName() {
  const tasks = ["Fuel Check", "Runway Prep", "Crew Brief"];
  return tasks[Math.floor(Math.random() * tasks.length)];
}
export function getRandomAssignedUser() {
  const users = [
    "9907-second",
    "Aaron Newman",
    "administrator",
    "Anewone-9907",
    "ankit-9907",
    "Azher-9907",
    "brando-9907",
    "Brink-9907",
    "cem",
    "Cem-9907",
    "Christy",
    "christy-9907",
    "basic-user",
    "Brandon",
    "Brandy-9907",
    "brandon-9907",
    "cole-9907",
    "Cooper-9907",
    "CXTStaff-derek",
    "cxttest-9907",
    "cya-9907",
    "dean-9907",
    "David-9907",
  ];
  return users[Math.floor(Math.random() * users.length)];
}
export function getRandomReminderOption() {
  const options = [
    "None",
    "5 Minutes",
    "10 Minutes",
    "15 Minutes",
    "30 Minutes",
    "1 Hour",
    "2 Hours",
    "4 Hours",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomTaskComment() {
  const comments = [
    "Follow up with the client by EOD.",
    "Prepare the draft report.",
    "Need approval from the manager.",
    "Schedule a meeting with the team.",
    "Verify all attached documents.",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}
export function getRandomCompletedComment() {
  const comments = [
    "Task completed successfully.",
    "All requirements met and finalized.",
    "Wrapped up the task as expected.",
    "Completed with necessary documentation.",
    "Finished without any blockers.",
    "Verified and marked as done.",
    "Task reviewed and closed.",
    "No pending issues, marked completed.",
    "Completed after final review.",
    "Execution and validation complete.",
  ];

  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
}
export function generateRandomCrmTest1Number() {
  // Returns a random number between 1000 and 9999 as a string
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export function generateRandomCrmTest2Number() {
  // Returns a random number between 1000 and 9999 as a string
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export function getRandomCrmTest3Option() {
  const options = ["1", "2"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomCrmTest4Number() {
  return Math.floor(Math.random() * 10000).toString(); // Generates 0–9999
}
export function getRandomCrmTest5Value() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export function getRandomCrmTest6Option() {
  const options = ["Hassan", "gianni"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomCrmTest7Option() {
  const options = ["test2"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomPeanutButterType() {
  const options = ["Crunchy", "Smooth"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomJellyType() {
  const options = ["Grape", "Strawberry", "Apple", "Apricot"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomBreadType() {
  const options = ["White", "Wheat", "Whole Grain", "Brioche", "Sour Dough"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomSideOption() {
  const options = [
    "BBQ Chips",
    "Sour Cream and Onion Chips",
    "Cheesy poofs",
    "Corn Chips",
    "Sun Chips Chedder",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function generateRandomBillingGroupName() {
  const adjectives = ["Quick", "Smart", "Agile", "Bold", "Sharp"];
  const nouns = ["Group", "Team", "Unit", "Squad", "Division"];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${randomAdj}${randomNoun}${randomNum}`;
}
export function generateRandomDisplayCaption() {
  const captions = [
    "Preferred Client Group",
    "Corporate Billing",
    "VIP Accounts",
    "Online Billing Access",
    "Premium Delivery Group",
    "Monthly Invoicing",
    "Subscription Clients",
    "Express Billing",
    "Enterprise Accounts",
    "On-Demand Priority",
  ];

  const randomIndex = Math.floor(Math.random() * captions.length);
  return captions[randomIndex];
}
//
export function getRandomReferenceName() {
  const names = [
    "Billing Dept",
    "Warehouse A",
    "Accounting Team",
    "Main Office",
    "Logistics Partner",
    "Vendor Support",
    "East Branch",
    "Dispatch Center",
    "Procurement Team",
    "HR Admin",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
export function getRandomReferenceType() {
  const options = ["Both", "Reference 1", "Reference 2"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomDisplayOption1() {
  const options = [
    "Customer Reference",
    "Invoice Label",
    "Tracking Code",
    "PO Number",
    "Internal Ref 1",
    "Client Tag",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomDisplayOption2() {
  const options = [
    "Billing Code",
    "Reference ID",
    "Client Ref 2",
    "Tracking Ref",
    "PO Tag",
    "Account Label",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomReference1Format() {
  const formats = [
    "Invoice Number",
    "PO Number",
    "Tracking Number",
    "Custom Code",
    "Client Ref 1",
  ];
  const randomIndex = Math.floor(Math.random() * formats.length);
  return formats[randomIndex];
}
export function getRandomReference2Format() {
  const formats = [
    "Invoice Number",
    "PO Number",
    "Tracking Number",
    "Custom Code",
    "Client Ref 2",
  ];
  const randomIndex = Math.floor(Math.random() * formats.length);
  return formats[randomIndex];
}
export function getRandomInternetUserTemplate() {
  const templates = ["Admin", "GMoney", "Rachael", "templatetest", "tim"];
  return templates[Math.floor(Math.random() * templates.length)];
}
export function getRandomRateAdjustment() {
  // Generates a random number between -100 and 100, with one decimal point
  return (Math.random() * 200 - 100).toFixed(1);
}
export function getRandomInternetUserPhone() {
  const areaCode = Math.floor(100 + Math.random() * 900);
  const prefix = Math.floor(100 + Math.random() * 900);
  const lineNumber = Math.floor(1000 + Math.random() * 9000);
  return `${areaCode}-${prefix}-${lineNumber}`; // Format: 123-456-7890
}
export function getRandomBillingGroup() {
  const billingGroupIds = [
    "Mid-West",
    "North East",
    "South East",
    "West",
    "North West",
    "South West",
    "astro",
    "Elroy",
    "Judy",
    "Jane",
  ]; // Replace with valid IDs from your app
  return billingGroupIds[Math.floor(Math.random() * billingGroupIds.length)];
}
export function getRandomAcceptCreditCardOption() {
  const options = ["No", "Yes", "Required"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomDriverLocationOption() {
  const options = ["After Dispatch", "En Route Only", "Use Global"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomInternetUserId() {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `testuser-${timestamp}-${randomSuffix}`;
}

export function getRandomInternetUserPassword() {
  const passwords = ["P@ssword123!"];
  return passwords[Math.floor(Math.random() * passwords.length)];
}
export function getRandomInternetUserName() {
  const names = ["Sam"];
  return names[Math.floor(Math.random() * names.length)];
}
export function getRandomInternetUsereditName() {
  const names = ["Harry"];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomInternetUserEmail() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `user${randomNum}@testmail.com`;
}
export function getRandSelectDefaultServiceType() {
  const options = [
    "on Demand",
    "Out of Town",
    "Car",
    "Van",
    "Contract",
    "Trucker",
    "Floral",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomDisplayDriverLocation() {
  const options = ["After Dispatch", "En Route Only", "Use Global", "Disabled"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomDefaultOrderInternetType() {
  const options = [
    "Use Customer Record Default",
    "RouteStamps",
    "Use Customer",
    "Default",
    "Mileage Rates",
    "Zones Rate",
    "Flat Rate",
    "Percentage Rate",
    "Weight Rate",
    "GeoZone",
  ];
  return options[Math.floor(Math.random() * options.length)];
}

export function getRandomEditOrderType() {
  const options = [
    "Use Global Permission",
    "Never",
    "Until Dispatch",
    "Until Confirmation",
    "Until Pickup",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomCancelOrderType() {
  const cancelOrderTypes = [
    "Use Global Permission",
    "Never",
    "Until Dispatch",
    "Until Confirmation",
    "Until Pickup",
  ];
  return cancelOrderTypes[Math.floor(Math.random() * cancelOrderTypes.length)];
}
export function generateRandomEmail() {
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `user_${randomStr}@example.com`;
}
export function getRandomAddressBookEntry() {
  const addressBookEntries = [
    "Woodrow Wilson",
    "Ryleigh Hughes",
    "Justin Holley",
    "waugh",
    "Dutch Bros Coffee",
    "Nom Nom",
  ];
  return addressBookEntries[
    Math.floor(Math.random() * addressBookEntries.length)
  ];
}
export function getRandomAddressGroup() {
  const groups = ["group", "GR"];
  return groups[Math.floor(Math.random() * groups.length)];
}
export function getRandomLatitude() {
  return (Math.random() * 180 - 90).toFixed(6);
}
export function getRandomLongitude() {
  return (Math.random() * 360 - 180).toFixed(6);
}
export function getRandomBarcode() {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}
export function getRandomInternetUserLabel() {
  const labels = [
    "Main Office",
    // "Warehouse",
    // "Billing",
    // "Support",
    // "Delivery Point",
    // "Admin Dept",
    // "Customer Service",
    // "Returns Center",
    // "Tech Hub",
    // "Satellite Office",
    // "Headquarters",
    // "Logistics Center",
    // "Accounting Office",
    // "R&D Lab",
    // "Field Operations",
    // "Sales Office",
    // "IT Department",
    // "Marketing Suite",
    // "Security Office",
    // "Training Room",
    // "Distribution Hub",
    // "HR Department",
    // "Call Center",
    // "Engineering Bay",
    // "Compliance Office",
  ];
  return labels[Math.floor(Math.random() * labels.length)];
}
export function getRandomContractStopAlertOption() {
  const options = ["Global Alert Message", "Internet User Alert Message"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomContractStopAlertMessage() {
  const messages = [
    "This is a global alert for contract stop enforcement.",
    "Alert: Contract has reached its stop date.",
    "Customer alert: Your contract services are currently paused.",
    "The preferred pickup time is scheduled for [ContractStopDate] - [PreferredTime] and the courier has not arrived yet. Are you sure you would like to place this order?",
    "The preferred pickup time is scheduled for [ContractStopDate] - [PreferredTime] and the courier has not arrived yet. Are you sure you would like to place this order?",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
export function getRandomSearchTerm() {
  const options = [
    "JW Marriott (Route Start) - 200233",
    "Sea World - 200269",
    "The Wine Room - 200270",
    "Epcot - 200271",
    "Discovery Cove - 200273",
    "University of Central Florida - 200274",
    "CHASE HOME LENDING - 200575",
    "BANE MANAGEMENT LLC - 9ML - 200576",
    "Deer Valley Plumbing Contractors INC - 200577",
    "T&G POOL SERVICE - 200578",
    "ROSIE'S BEAUTY SALON & BARBER - 200579",
    "S & R DESIGNS - 200580",
    "KABOOM - 200581",
    "L & K - 200582",
    "A TOUCH OF CLASS TRAVEL - WVL - 200583",
    "H.K.B. INC - 200584",
    "Az Neuro Surgery And Spine - 200585",
    "BANNER FAM MED-VAL VISTA - 200586",
    "TRIAD WORLDWIDE LLC - 200587",
    "CXT Software - 200588",
    "CXT Software - 200589",
    "Giani valen - 239866",
  ];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomShippingLabelOption() {
  const options = [
    "Allow Shipping Labels",
    "-24 - 4x4 Shipping Label",
    "4949 - Christy Test",
    "-1 - CXT - Order Shipping Label",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomShippingXRouteLabelOption() {
  const options = [
    "Abigail McCreadie - 27235",
    "Abigail Cranshaw - 28125",
    "Abigail Seery - 29522",
    "Abigale Janecki - 15338",
    "Abigale Elmar - 21576",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomShippingCustomerLabelOption() {
  const options = [
    "Brandons Cars - 234265397",
    "Brandy's Brandy - 234265393",
    "Canada Customer - 2176",
    "Canetexon - 3280",
    "Cantanix - 2190",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomShippingOptionsTabLabelOption() {
  const options = [
    "Allow Address Entry",
    "Allow Edit to Deliver From Time",
    "Show Deliver By Time",
    "View Account Reports",
    "View Route Stops",
    "Modify Route Stops",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
// Returns one random Contract Stop checkbox label
export function getRandomContractStopCheckboxLabel() {
  const options = ["Toggle All"];

  return options[Math.floor(Math.random() * options.length)];
}

export function getRandomStatusCodeShowAllOption() {
  const options = ["Show All"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomStatusCodeActiveOption() {
  const options = ["Active"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomStatusCodeInactiveOption() {
  const options = ["Inactive"];
  return options[Math.floor(Math.random() * options.length)];
}
export function getRandomCreditLimitAmount() {
  const amount = Math.floor(Math.random() * 9000) + 1000; // 1000 to 9999
  return amount.toLocaleString("en-US", { minimumFractionDigits: 2 }); // "5,656.00"
}
export function getRandomStartPastDueWarningOption() {
  const options = [
    "Use Global Option",
    "Never",
    "After 15 days",
    "After 30 days",
    "After 45 days",
    "After 60 days",
    "After 75 days",
    "After 90 days",
    "After 105 days",
    "After 120 days",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
export function getRandomStartCreditHoldOption() {
  const options = [
    "Use Global Option",
    "Never",
    "After 15 days",
    "After 30 days",
    "After 45 days",
    "After 60 days",
    "After 75 days",
    "After 90 days",
    "After 105 days",
    "After 120 days",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
