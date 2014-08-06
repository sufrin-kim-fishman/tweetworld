var states = new Array("Argentina", "Australia", "Austria", "Bahamas", "Belgium", "Belize", "Bolivia", "Brazil", "Bulgaria", "Canada", "Cayman Islands", "Chile", "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand", "Trinidad and Tobago", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Zambia");

var states_translated = new Array("Argentina", "Australia", "Österreich", "Bahamas", "Belgium", "Belize", "Bolivia", "Brasil", "България", "Canada", "Cayman Islands", "Chile", "Colombia", "Costa Rica", "Hrvatska", "Cyprus", "Czech Republic", "Danmark", "Dominican Republic", "Ecuador", "مصر", "El Salvador", "Eesti", "Suomi", "France", "Deutschland", "Ghana", "Ελλάδα", "Guatemala", "Guyana", "Haiti", "Honduras", "Hong Kong", "Magyarország", "Ísland", "भारत", "Indonesia", "Éire", "ישראל", "Italia", "Jamaica", "日本", "الأردن", "Kenya", "الكويت", "Latvija", "لبنان", "Lietuva", "Luxemburg", "Malaysia", "Maldives", "Malta", "México", "المغرب", "Nederland", "Aotearoa", "Nicaragua", "Nigeria", "Norge", " پاکستان", "Panamá", "Paraguái", "Peru", "Pilipinas", "Polska", "Portugal", "Qatar", "România", "Россия", " السعودية", "新加坡", "Slovensko", "Slovenija", "Suid-Afrika", "South Korea", "España", "Suriname", "Sweden", "Schweiz", "臺灣/台湾", "Tanzania", "ประเทศไทย", "Trinidad and Tobago", "Türkiye", "Uganda", "Україна", "الإمارات العربية المتحدة", "United Kingdom", "United States", "Uruguay", "Venezuela", "Việt Nam", "Zambia");


for(var hi=0; hi<states_translated.length; hi++)
    document.write("<option value=\""+states_translated[hi]+"\">"+states_translated[hi]+"</option>");



