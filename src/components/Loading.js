const loading = (props) => {
    
}




// !!!!!!!!!
// Extract the Accept-Language header from the request object
const acceptLanguageHeader = req.headers['accept-language'];

// Define a function to parse the header and get the preferred language
const getPreferredLanguage = (header) => {
  const languages = header.split(',').map((lang) => lang.split(';')[0]);
  return languages[0];
};

// Get the preferred language
const preferredLanguage = getPreferredLanguage(acceptLanguageHeader).slice(0, 2);

// Read the JSON file from the public folder
const filePath = path.join(process.cwd(), 'public', 'locales', preferredLanguage, 'facts.json');
const fileContents = fs.readFileSync(filePath, 'utf8');
const facts = JSON.parse(fileContents);

let random = Math.floor(Math.random() * facts.length);


return {
  props: {
    facts,
    random,
    ...(await serverSideTranslations(preferredLanguage, ['navbar', 'login', 'facts'])),
  }
};