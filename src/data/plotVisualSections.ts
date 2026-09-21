export type PlotVisualCard = {
  tag?: string
  title: string
  description: string
  image: string
  alt: string
}

export type PlotDriveCard = {
  time: string
  place: string
  note?: string
}

export type PlotVisualSections = {
  amenitiesEyebrow?: string
  amenitiesTitle: string
  amenitiesSubtitle?: string
  amenities: PlotVisualCard[]
  connectivityEyebrow?: string
  connectivityTitle: string
  connectivitySubtitle?: string
  drives?: PlotDriveCard[]
  connectivity: PlotVisualCard[]
}

const L = (name: string) => `/images/landings/${name}.jpg`

function amenity(title: string, image: string, alt: string, description: string): PlotVisualCard {
  return { title, image, alt, description }
}

function conn(
  tag: string,
  title: string,
  image: string,
  alt: string,
  description: string
): PlotVisualCard {
  return { tag, title, image, alt, description }
}

const ramaEnclave: PlotVisualSections = {
  amenitiesEyebrow: 'Township',
  amenitiesTitle: 'A Society You Can Live In, Not Only Hold',
  amenitiesSubtitle:
    'Presented by Rama Global Infra Pvt. Ltd. — a premium gated township on the Jewar growth corridor.',
  amenities: [
    amenity('Gated Society', '/images/landings/rama-amen-gated.png', 'Gated township entrance at dusk', 'A lockable community, not an open field with a board and a promise.'),
    amenity('Sprawling Greens', '/images/landings/rama-amen-greens.png', 'Township park and club beside green plots', 'Park, mandir, and club planned into the layout — the difference between a neighbourhood and a warehouse yard.'),
    amenity('Wide Internal Roads', '/images/landings/rama-amen-roads.png', 'Wide black-pitch township road', 'Internal roads at 25, 30 and 40 ft with black-pitch surfacing as marketed.'),
    amenity('Away From Pollution', '/images/landings/rama-amen-clean-air.png', 'Open green plains under a clear sky', 'A quieter, greener hold away from dense city air with sprawling landscapes and wide roads.'),
    amenity('24/7 Water & Electricity', '/images/landings/rama-amen-power.png', 'Township street with electricity and water infrastructure', 'Government electricity and 24/7 water and power marketed from the start.'),
    amenity('24/7 Security', '/images/landings/rama-amen-security.png', 'Gated township security at night', 'Round-the-clock security and a concrete boundary wall keep a gated plot feeling like a home.'),
    amenity('Temple', '/images/landings/rama-amen-temple.png', 'Township mandir in a landscaped park', 'A mandir planned inside the gated layout so daily prayer does not mean leaving the society.'),
    amenity('Hospital Nearby', '/images/landings/rama-amen-hospital.png', 'Modern hospital with landscaped approach', 'Nearby healthcare is part of the liveability story, not an afterthought on a brochure.'),
  ],
  connectivityEyebrow: 'The Corridor',
  connectivityTitle: "What's Actually Rising Around This Land",
  connectivitySubtitle:
    'Airport, expressway, Film City, Formula 1, universities, metro, and industrial hubs — Rama Enclave sits inside that map.',
  drives: [
    { time: '25 mins', place: 'Jewar Airport', note: 'Noida International Airport, as marketed from the gate.' },
    { time: 'On corridor', place: 'Film City', note: 'The planned media hub on the same Jewar stretch.' },
    { time: 'On corridor', place: 'Formula 1', note: 'Buddh International Circuit already put this belt on the map.' },
    { time: 'Nearby', place: 'Top Universities', note: 'Campuses families already drive the expressway for.' },
    { time: 'On map', place: 'Metro & Rapid Rail', note: 'Public transport planned onto the same corridor.' },
    { time: 'Growth belt', place: 'Industrial & IT Hub', note: 'Jobs, logistics, and the Defence Corridor story.' },
    { time: 'Growth belt', place: 'Medical Device Park', note: 'Healthcare and industry on the same Jewar map.' },
    { time: 'Growth belt', place: 'Olympic Park', note: 'Sports and tourism infrastructure on the wider belt.' },
  ],
  connectivity: [
    conn('Noida International Airport', 'About Twenty-Five Minutes From Where North India Touches Down', '/images/landings/rama-conn-airport.png', 'Jewar airport at dusk', 'Noida International Airport is going up in Jewar. Rama Enclave lists the drive at about twenty-five minutes from the gate.'),
    conn('Yamuna Expressway', 'On the Road That Already Connects Delhi to Agra', '/images/landings/rama-conn-expressway.png', 'Yamuna Expressway through farmland', 'Rama Enclave sits on the Yamuna Expressway growth belt — the same road that already moves traffic between NCR and Agra.'),
    conn('Film City', "Bollywood's Next Chapter, Planned Down the Road", '/images/landings/rama-conn-film-city.png', 'Film studio campus on the Jewar corridor', 'A 1,000-acre Film City is planned on this stretch. Rama Enclave puts a gated address on the same belt.'),
    conn('Buddh International Circuit', 'The Track That Already Put This Stretch on the Map', '/images/landings/rama-conn-f1.png', 'Racing circuit on the expressway belt', 'Buddh International Circuit once hosted Formula One in India — proof this stretch draws national attention.'),
    conn('Top Universities', 'Campuses Families Already Drive This Belt For', '/images/landings/rama-conn-universities.png', 'University campus on the expressway belt', 'Top universities sit on the Yamuna Expressway belt — easy to explain to relatives who care about schools.'),
    conn('Metro & Rapid Rail', 'Rail Coming Onto the Same Map as the Airport', '/images/landings/rama-conn-metro-rail.png', 'Metro viaduct over a growth corridor', 'Rapid Rail and metro plans sit on the same Jewar–Yamuna Expressway map as this township.'),
    conn('Medical Device Park', 'Healthcare and Industry, Not Only a Future Slide', '/images/landings/rama-conn-medical-park.png', 'Medical device campus near Jewar', 'A medical device park and nearby healthcare sit on the same Jewar growth map.'),
    conn('Industrial & IT Hub', 'Jobs on the Same Belt as the Gate', '/images/landings/rama-conn-industrial.png', 'Industrial campus along the expressway', 'Industrial parks, IT hubs, and logistics draw jobs onto the Jewar–Yamuna Expressway belt.'),
  ],
}

const hariShyam: PlotVisualSections = {
  amenitiesEyebrow: 'Township',
  amenitiesTitle: 'A Society You Can Live In, Not Only Hold',
  amenitiesSubtitle:
    'Presented by Hari Kripa Buildscape Pvt. Ltd. — a premium gated township on the Jewar growth corridor.',
  amenities: [
    amenity('Wide Roads', L('hari-shyam-gated'), 'Wide internal roads in a gated township', 'Internal roads planned for a real township, not a farm cut with a single dusty track.'),
    amenity('Green Environment', L('gated-park'), 'Landscaped park inside a gated community', 'Open greenery around the plots — parks and planting that make a gated plot feel like a neighbourhood.'),
    amenity('Gated Society', L('hari-shyam-gated'), 'Gated township entrance', 'A lockable community sold as a gated society so you know where the boundary is.'),
    amenity('Electricity & Water', L('hari-shyam-gated'), 'Township infrastructure at the gate', 'Power and water facility planned into the township from the start.'),
    amenity('Park & Open Area', L('gated-park'), 'Green park inside the township', 'Parks and open space so the land stays a neighbourhood, not a warehouse yard.'),
    amenity('Future Growth', L('jewar-airport'), 'Airport rising on the Jewar plains', 'Airport, expressway, Film City and logistics are the upside story of this belt.'),
  ],
  connectivityEyebrow: 'The Corridor',
  connectivityTitle: "What's Actually Rising Around This Land",
  connectivitySubtitle:
    'Airport, expressway, Film City, logistics, and F1 — Hari Shyam Township sits inside the Jewar growth map.',
  drives: [
    { time: 'Nearby', place: 'Jewar Airport', note: 'Noida International Airport on the growth corridor.' },
    { time: 'On corridor', place: 'Yamuna Expressway', note: 'The road that already connects Delhi to Agra.' },
    { time: 'Growth belt', place: 'Film City', note: 'Planned media hub on the same stretch.' },
    { time: 'Growth belt', place: 'Logistics Hubs', note: 'Warehousing and commercial demand around the airport.' },
    { time: 'On corridor', place: 'Formula 1 Track', note: 'Buddh International Circuit on this belt.' },
  ],
  connectivity: [
    conn('Noida International Airport', 'Minutes From Where North India Touches Down', L('jewar-airport'), 'Modern airport on the Jewar plains', 'Noida International Airport is going up in Jewar. Plots within an easy drive are the ones people look at first.'),
    conn('Yamuna Expressway', 'On the Road That Already Connects Delhi to Agra', L('yamuna-expressway'), 'Yamuna Expressway through farmland', 'Hari Shyam Township sits on the Yamuna Expressway growth belt — time the drive on a site visit this week.'),
    conn('Film City', "Bollywood's Next Chapter, Planned Down the Road", L('film-city-jewar'), 'Film studio campus on the corridor', 'A 1,000-acre Film City is planned on this stretch — one of the largest media hubs proposed in North India.'),
    conn('Logistics & Commerce', 'A Growing Ecosystem, Not a Quiet Village Plot', L('logistics-jewar'), 'Logistics warehouses along the expressway', 'Jewar is drawing logistics parks and commercial demand around the airport.'),
    conn('Buddh International Circuit', 'The Track That Already Put This Stretch on the Map', L('buddh-circuit'), 'Racing circuit on the expressway belt', 'Buddh International Circuit once hosted Formula One in India on this same belt.'),
    conn('Gated Township', 'Wide Roads, Parks, and a Society You Can Lock', L('hari-shyam-gated'), 'Gated plot township with wide roads', 'Planned as a gated society with wide roads, greenery, electricity, water, and open parks.'),
  ],
}

const lalitaKunj: PlotVisualSections = {
  amenitiesEyebrow: '40 Acres · 582 Plots',
  amenitiesTitle: 'A Township, Not a Scattered Cut',
  amenitiesSubtitle:
    'Government-approved planning with roads, parks, civic amenities — and RERA on the way.',
  amenities: [
    amenity('52 Ft & 35 Ft Roads', L('lalita-township'), 'Planned township roads and community buildings', 'Wide internal roads so the layout stays a township, not a tight village lane.'),
    amenity('7 Parks', L('gated-park'), 'Green park in a planned township', 'Open green pockets planned across the 40 acres for families.'),
    amenity('School & Community Hall', L('lalita-township'), 'Township civic buildings in the plan', 'Civic space inside the project so the land has a neighbourhood from day one.'),
    amenity('Commercial Shops', L('colony-shops'), 'Shops along a planned colony street', 'Daily-need shops in the plan — the difference between a colony and an empty field.'),
    amenity('Power, Water, Sewerage', L('lalita-township'), 'Township infrastructure layout', 'Electricity, water and sewerage planned as part of a gated, well-planned development.'),
    amenity('RERA Coming', L('nandgaon'), 'Historic temple town of Nandgaon', 'Zila Panchayat approved today, with 80C benefit, mutation*, and RERA on the way.'),
  ],
  connectivityEyebrow: 'The Circuit',
  connectivityTitle: 'Faith Meets a Corridor That’s Being Built Out',
  connectivitySubtitle: 'Nandgaon, Barsana, Govardhan, Vrindavan — Lalita Kunj sits inside the Braj map people already travel.',
  drives: [
    { time: 'Approx. 5 km', place: 'Nandgaon', note: 'Krishna’s childhood town on the Braj circuit.' },
    { time: 'Approx. 6 km', place: 'Kokilavan', note: 'Shani Dev Temple at Kokilavan.' },
    { time: 'Approx. 10 km', place: 'Barsana', note: 'Shri Radha Rani Temple.' },
    { time: 'Approx. 15 km', place: 'Govardhan', note: 'Govardhan Parikrama Marg.' },
    { time: 'Approx. 25 km', place: 'Vrindavan', note: 'Inside the Braj map without old-town prices.' },
  ],
  connectivity: [
    conn('Nandgaon', 'Five Kilometres From Krishna’s Childhood Town', L('nandgaon'), 'Temple town of Nandgaon', 'Nandgaon is about 5 km away — a plotted township next to a place pilgrims already travel.'),
    conn('Shri Radha Rani Temple', 'Ten Kilometres From Barsana’s Main Temple', L('radha-rani-barsana'), 'Shri Radha Rani Temple in Barsana', 'Spiritual tourism footfall already exists — Lalita Kunj sits on that Braj circuit.'),
    conn('Kokilavan', 'Shani Dev Temple, About Six Kilometres Away', L('kokilavan-shani'), 'Shani Dev Temple at Kokilavan', 'Weekend and festival traffic already moves through this belt.'),
    conn('Govardhan', 'Fifteen Kilometres From the Parikrama Marg', L('govardhan-parikrama'), 'Pilgrims on Govardhan Parikrama Marg', 'Land on the same spiritual circuit families already plan for darshan.'),
    conn('Vrindavan', 'Twenty-Five Kilometres From the Town Everyone Knows', L('vrindavan-temples'), 'Temple complex along the Vrindavan circuit', 'Close enough for a second home without paying Vrindavan-core prices.'),
    conn('Tourism Works', 'Roads and Amenities Being Planned Around Braj', L('lalita-township'), 'Planned township at Lalita Kunj', 'Road widening, tourist amenities, and access-road works are coming to the Barsana–Nandgaon region.'),
  ],
}

const nariSemri: PlotVisualSections = {
  amenitiesEyebrow: 'Township',
  amenitiesTitle: 'Gated Infrastructure You Can Walk and Check',
  amenitiesSubtitle: 'Shubh Labh Group township layouts near NH-19 and Sanskriti University.',
  amenities: [
    amenity('Gated Community', L('shubh-labh-layout'), 'Gated plotted township layout', 'Gated entry with a layout you can walk before you commit — not a PDF amenity list.'),
    amenity('Wide Roads', L('shubh-labh-layout'), 'Wide internal roads at the main gate', 'Roads up to 75 ft at the main gate as marketed by Shubh Labh Group.'),
    amenity('STP & Water Supply', L('gated-park'), 'Township green spaces and infrastructure', 'Sewage treatment plant and 24/7 water via overhead tanks planned in.'),
    amenity('Parks', L('gated-park'), 'Landscaped park inside the township', 'Open green pockets across the layout for families.'),
    amenity('CCTV Security', L('vrinda-gated-luxury'), 'Gated luxury residential community', 'Round-the-clock security and CCTV as part of the township plan.'),
    amenity('NH-2 Frontage', L('nh2-corridor'), 'NH-2 corridor toward Mathura–Vrindavan', 'On the highway people already use — not hidden behind a village track.'),
  ],
  connectivityEyebrow: 'The Belt',
  connectivityTitle: 'A Township on the Road Into Vrindavan',
  connectivitySubtitle: 'University, highway, temples, expressway access — Nari Semri sits where those already meet.',
  drives: [
    { time: 'Nearby', place: 'Sanskriti University', note: 'Campus neighbourhood, not an isolated khet.' },
    { time: 'On corridor', place: 'NH-19 / NH-2', note: 'The road into Mathura–Vrindavan.' },
    { time: 'Local belt', place: 'Mathura–Vrindavan', note: 'Inside the spiritual circuit people already travel.' },
  ],
  connectivity: [
    conn('Sanskriti University', 'Campus Neighbourhood, Not an Isolated Khet', L('sanskriti-university'), 'University campus near the Vrindavan highway', 'Nari Semri plots sit near Sanskriti University — a campus that already brings year-round movement.'),
    conn('NH-19 / NH-2', 'On the Highway, Not Hidden Behind a Village Track', L('nh2-corridor'), 'NH-2 corridor heading toward Vrindavan', 'The layout sits on the NH-2 corridor — access is the first thing serious plot buyers check.'),
    conn('Mathura–Vrindavan', 'Inside the Spiritual Circuit People Already Travel', L('mathura-circuit'), 'Temple ghats on the Mathura–Vrindavan circuit', 'Pilgrimage, weekend homes, and long-stay buyers looking for gated land with a temple-town address.'),
    conn('Township Planning', 'Wide Roads, STP, Parks, Overhead Water', L('shubh-labh-layout'), 'Gated plotted township with wide roads', 'Gated entry, STP, 24/7 water, parks, and CCTV — infrastructure you can walk and check.'),
    conn('Vrindavan Temples', 'Prem Mandir and ISKCON on the Same Circuit', L('prem-mandir'), 'Prem Mandir on the Vrindavan circuit', 'Prem Mandir and ISKCON sit on the same circuit this highway already serves.'),
    conn('Yamuna Expressway', 'NCR Access Without Giving Up the Braj Address', L('yamuna-expressway'), 'Yamuna Expressway through open land', 'Expressway access keeps Delhi NCR in range while you hold land on the Vrindavan highway belt.'),
  ],
}

const radhaKrishnaAshram: PlotVisualSections = {
  amenitiesEyebrow: 'Ashram Township',
  amenitiesTitle: 'A Gated Community You Can Live In',
  amenitiesSubtitle: 'Radha Krishna Vrindavan Ashram by Shubh Labh Group on NH-2 opposite Sukhdev Dhaba.',
  amenities: [
    amenity('24/7 Security', L('vrinda-gated-luxury'), 'Gated luxury residential community', 'Gated security so the plot stays a home, not an open field after dark.'),
    amenity('CCTV Surveillance', L('shubh-labh-layout'), 'Gated township layout', 'CCTV across the community as marketed by Shubh Labh Group.'),
    amenity('Power Backup', L('shubh-labh-layout'), 'Township infrastructure', 'Power backup planned for a community you can actually live in.'),
    amenity('Parks', L('gated-park'), 'Landscaped park inside the community', 'Green parks across the ashram township layout.'),
    amenity('Sports Courts', L('gated-park'), 'Park and sports area in a gated society', 'Badminton and basketball courts as part of the marketed amenities.'),
    amenity('Gated Entry', L('shubh-labh-layout'), 'Gated plotted development', 'A named ashram township on NH-2 — opposite a landmark drivers already know.'),
  ],
  connectivityEyebrow: 'The Circuit',
  connectivityTitle: 'Temples, Highway, and a Gated Layout in Between',
  connectivitySubtitle: 'Prem Mandir, ISKCON, NH-2 — this ashram township sits on the road people already take into Vrindavan.',
  drives: [
    { time: 'Opposite', place: 'Sukhdev Dhaba', note: 'A highway landmark everyone on NH-2 knows.' },
    { time: 'On highway', place: 'NH-2', note: 'Near Nari Semri, Vrindavan approach.' },
    { time: 'Circuit', place: 'Prem Mandir & ISKCON', note: 'Temple drives timed on your site visit.' },
  ],
  connectivity: [
    conn('Prem Mandir', 'On the Same Circuit as Vrindavan’s Marble Temple', L('prem-mandir'), 'Prem Mandir marble temple', 'Prem Mandir is on the Vrindavan circuit this community is built for.'),
    conn('ISKCON Temple', 'ISKCON Is Part of the Same Drive', L('iskcon-vrindavan'), 'ISKCON Krishna Balaram Mandir', 'ISKCON sits on the same Vrindavan circuit second-home buyers already know.'),
    conn('Sukhdev Dhaba / NH-2', 'Opposite a Landmark Everyone on This Highway Knows', L('nh2-corridor'), 'NH-2 highway corridor', 'NH-2 near Nari Semri, opposite Sukhdev Dhaba — a pin drivers already know.'),
    conn('Parks & Sports', 'Parks, Power Backup, and Sports Courts', L('gated-park'), 'Green park inside a gated community', 'Gated community with parks, sports courts, security, and CCTV as marketed.'),
    conn('Yamuna Expressway', 'NCR Still in Reach', L('yamuna-expressway'), 'Yamuna Expressway in North India', 'Expressway access keeps Greater Noida and Delhi in the conversation.'),
    conn('Shubh Labh Group', 'One Group, Three Layouts on This Belt', L('shubh-labh-layout'), 'Shubh Labh Group township layout', 'Also presents Nari Semri and Radha Krishna Puram on the same belt.'),
  ],
}

const radhaKrishnaPuram: PlotVisualSections = {
  amenitiesEyebrow: 'Gated Colony',
  amenitiesTitle: 'Streets, Shops, and a Colony Behind the Gate',
  amenitiesSubtitle: 'Radha Krishna Puram by Shubh Labh Group — NH-2, opposite Sukhdev Dhaba, Mathura 281401.',
  amenities: [
    amenity('Gated Colony', '/images/plots/radha-krishna-puram/01.jpg', 'Gated colony entrance at Radha Krishna Puram', 'A gated colony with a postal pin — not a “coming soon” sector.'),
    amenity('25–40 Ft Internal Roads', '/images/plots/radha-krishna-puram/02.jpg', 'Internal street at Radha Krishna Puram', 'Internal roads from 25 ft to 40 ft — streets you can drive, not lanes you negotiate.'),
    amenity('Commercial Shops', L('colony-shops'), 'Commercial shops in the colony layout', 'Shops inside the layout so daily needs are not a highway run.'),
    amenity('Parks', L('gated-park'), 'Neighbourhood park in the colony', 'Dedicated parks as part of the gated colony infrastructure.'),
    amenity('Water & Power Lines', L('shubh-labh-layout'), 'Township utility planning', 'Water supply lines and electrical connections planned in the layout.'),
    amenity('24/7 Security', L('vrinda-gated-luxury'), 'Gated residential community', 'Round-the-clock security for a colony people can actually live in.'),
  ],
  connectivityEyebrow: 'The Location',
  connectivityTitle: 'Highway Frontage With a Colony Behind the Gate',
  connectivitySubtitle: 'Sukhdev Dhaba, NH-2, Vrindavan, expressway access — Puram is built for shops and streets.',
  drives: [
    { time: 'Opposite', place: 'Sukhdev Dhaba', note: 'Nari Semri Village, NH-2, Mathura 281401.' },
    { time: 'On highway', place: 'NH-2', note: 'Directly on the highway corridor.' },
    { time: 'Nearby', place: 'Vrindavan', note: 'Temple town on the same map.' },
  ],
  connectivity: [
    conn('Sukhdev Dhaba', 'Opposite a Highway Landmark You Can Actually Find', '/images/plots/radha-krishna-puram/01.jpg', 'Radha Krishna Puram colony entrance', 'If a driver can find the dhaba, they can find your colony gate.'),
    conn('NH-2', 'Directly on the Highway Corridor', L('nh2-corridor'), 'National highway into Vrindavan', 'NH-2 at the gate, Vrindavan on the same map — a colony plan behind the boundary.'),
    conn('Internal Roads', '25 to 40 Feet — Streets You Can Drive', '/images/plots/radha-krishna-puram/02.jpg', 'Internal street at Radha Krishna Puram', 'Road width is one of the first things checked on a site visit here.'),
    conn('Commercial Shops', 'Shops Inside the Layout', L('colony-shops'), 'Shops along a planned colony street', 'Commercial spaces within the layout — not a dead-end society.'),
    conn('Vrindavan', 'Temple Town Nearby, Highway Under the Gate', L('vrindavan-temples'), 'Temple complex in Vrindavan', 'A temple-town address with a highway you can find.'),
    conn('Yamuna Expressway', 'NCR Buyers Can Still Make the Drive', L('yamuna-expressway'), 'Yamuna Expressway for NCR buyers', 'Corridor access keeps Greater Noida and Delhi in range for weekend buyers.'),
  ],
}

const vrindaVatika: PlotVisualSections = {
  amenitiesEyebrow: 'Gated Community',
  amenitiesTitle: 'Ultra-Luxury Living on NH-2',
  amenitiesSubtitle: 'Vrinda Vatika Homes by VVH Group — 80(1) approved freehold gated community, 900 m from Sanskriti University.',
  amenities: [
    amenity('Gated Society', L('vrinda-gated-luxury'), 'Ultra-luxury gated residential community', 'Government 80(1)-approved freehold gated community on NH-2, Semri.'),
    amenity('Wide Roads', L('vrinda-gated-luxury'), 'Wide internal roads in a luxury township', 'Gated streets with wide roads and street lighting as listed by VVH Group.'),
    amenity('24x7 CCTV Security', L('vrinda-gated-luxury'), 'Secure gated community entrance', 'Round-the-clock CCTV security across the community.'),
    amenity('Club House & Pools', L('vrinda-gated-luxury'), 'Luxury gated community amenities', 'Club house, swimming pools, and premium amenities on site.'),
    amenity('Parks & Kids Play', L('gated-park'), 'Landscaped park in the community', 'Parks and kids’ play areas across the gated layout.'),
    amenity('Solar & Power Backup', L('prem-mandir-night'), 'Illuminated community at dusk', 'Solar lighting and power backup as listed by the developer.'),
  ],
  connectivityEyebrow: 'Vrindavan',
  connectivityTitle: 'Temples on the Clock. NCR on the Calendar.',
  connectivitySubtitle: 'Sanskriti University is 900 metres away. Prem Mandir, ISKCON, Bankey Bihari — timed in minutes.',
  drives: [
    { time: '900 m', place: 'Sanskriti University', note: 'The main landmark — walkable on NH-2.' },
    { time: '2 hours', place: 'New Delhi', note: 'Weekend home distance for NCR families.' },
    { time: '1.5 hours', place: 'Greater Noida', note: 'Expressway access that already works today.' },
    { time: '2 hours', place: 'Gurugram', note: 'Same corridor story as Delhi.' },
    { time: '45 min', place: 'Agra', note: 'Taj circuit demand on the same map.' },
    { time: '15 min', place: 'Mathura & Railway', note: 'Town and trains without giving up the Vrindavan address.' },
  ],
  connectivity: [
    conn('Sanskriti University', 'Nine Hundred Metres From Campus', L('sanskriti-university'), 'University campus near Vrinda Vatika Homes', 'On NH-2, only 900 metres from Sanskriti University — a neighbour you can walk.'),
    conn('Maa Vishno Devi Dham', 'Eight Minutes From the Temple Gate', L('maa-vishno-devi-dham'), 'Maa Vishno Devi Dham near Vrindavan', 'About 8 minutes from the site — the spiritual circuit starts almost at the gate.'),
    conn('Prem Mandir', 'About Ten Minutes From the Marble Temple', L('prem-mandir-night'), 'Illuminated Prem Mandir at night', 'Close enough for evening lights and a proper visit without old-town lane premiums.'),
    conn('Chandrodaya Mandir', 'Ten Minutes From a Temple Planned to Touch the Sky', L('chandrodaya-mandir'), 'Planned Vrindavan Chandrodaya Mandir', 'The upcoming 700-ft Krishna temple sits on this same belt.'),
    conn('Garud Govind Temple', 'Twelve Minutes From Garud Govind', L('garud-govind-temple'), 'Garud Govind Temple on the circuit', 'Part of the same tight temple loop as Prem Mandir and ISKCON.'),
    conn('ISKCON Temple', 'Twelve Minutes From ISKCON', L('iskcon-vrindavan'), 'ISKCON Temple on the Vrindavan circuit', 'The temple loop is the lifestyle; the gated plot is how you stay overnight in it.'),
    conn('Bankey Bihari Mandir', 'Fifteen Minutes From Bankey Bihari', L('bankey-bihari'), 'Bankey Bihari Mandir in Vrindavan', 'Close enough for morning darshan without paying the old-city lane premium.'),
    conn('Delhi NCR', 'About Two Hours From New Delhi', L('yamuna-expressway'), 'Expressway from NCR toward Vrindavan', 'Built for NCR families who want Vrindavan without giving up the city.'),
  ],
}

const IMG = (name: string) => `/images/plots/ladli-govindvan/${name}`

const laadliGovindvan: PlotVisualSections = {
  amenitiesEyebrow: 'Laadli Govindvan',
  amenitiesTitle: 'A Community Designed for Meaningful Life',
  amenitiesSubtitle: 'A plotted township in Vrindavan by Laadli Group. Club house, parks, gaushala, and a meditation centre on the plan.',
  amenities: [
    amenity('Master Plan', IMG('cover.jpg'), 'Aerial master plan of Laadli Govindvan', '489 residential plots planned with parks, roads, a club house, resort, and commercial area.'),
    amenity('Landscape Garden', IMG('central-garden.jpg'), 'Central garden and water feature', 'Open green pockets and pathways planned for calm walks.'),
    amenity('Meditation Centre', IMG('meditation.jpg'), 'Meditation pavilion in the landscape', 'A dhyaan kendra planned as a quiet place inside the township.'),
    amenity('Club & Resort', IMG('retail-street.jpg'), 'Planned community street inside the township', 'Club house, resort, and commercial area sit inside the layout.'),
    amenity('Wide Internal Roads', IMG('internal-road.jpg'), 'Internal township road', 'Roads take 32.91% of the remaining land so the layout stays open.'),
    amenity('Gaushala', IMG('poster.jpg'), 'Laadli Govindvan project poster', 'A gaushala is part of the amenity plan, along with 24x7 security and fresh water.'),
  ],
  connectivityEyebrow: 'Vrindavan',
  connectivityTitle: 'Seamless Access to Endless Possibilities',
  connectivitySubtitle: 'Prem Mandir, Banke Bihari, NH-2, and the Yamuna Expressway, timed from the site.',
  drives: [
    { time: '5 min', place: 'NH-2 / Delhi-Mathura Highway', note: 'Highway access without living in the old lanes.' },
    { time: '7 min', place: 'Prem Mandir', note: 'The marble temple on a short drive.' },
    { time: '10 min', place: 'Banke Bihari Mandir', note: 'Morning darshan without an old-city plot.' },
    { time: '20 min', place: 'Yamuna Expressway', note: 'The road back toward NCR.' },
    { time: '45 min', place: 'Jewar International Airport', note: 'The new airport on the same regional map.' },
  ],
  connectivity: [
    conn('Prem Mandir', 'Seven Minutes from Prem Mandir', IMG('cover.jpg'), 'Laadli Govindvan master plan', 'The brochure times Prem Mandir at about 7 minutes.'),
    conn('Banke Bihari', 'Ten Minutes from Banke Bihari Mandir', IMG('central-garden.jpg'), 'Garden inside Laadli Govindvan', 'Close enough for darshan, planned as a quieter residential hold.'),
    conn('ISKCON', 'Five Minutes from ISKCON Temple', IMG('meditation.jpg'), 'Meditation centre at Laadli Govindvan', 'ISKCON, Garud Govind, and the Delhi-Mathura highway are timed at about 5 minutes.'),
    conn('Jewar Airport', 'Forty-Five Minutes from Jewar Airport', IMG('internal-road.jpg'), 'Internal road at Laadli Govindvan', 'Yamuna Expressway is about 20 minutes. Jewar International Airport is about 45 minutes.'),
  ],
}

const bySlug: Record<string, PlotVisualSections> = {
  'rama-enclave-jewar': ramaEnclave,
  'hari-shyam-township-jewar': hariShyam,
  'lalita-kunj-nandgaon-barsana': lalitaKunj,
  'nari-semri-plots-vrindavan': nariSemri,
  'radha-krishna-vrindavan-ashram': radhaKrishnaAshram,
  'radha-krishna-puram-vrindavan': radhaKrishnaPuram,
  'vrinda-vatika-homes-vrindavan': vrindaVatika,
  'laadli-govindvan-vrindavan': laadliGovindvan,
}

const byCode: Record<string, PlotVisualSections> = {
  'AX-RE-001': ramaEnclave,
  'AX-HS-001': hariShyam,
  'AX-LK-001': lalitaKunj,
  'AX-NS-001': nariSemri,
  'AX-RK-001': radhaKrishnaAshram,
  'AX-RP-001': radhaKrishnaPuram,
  'AX-VV-001': vrindaVatika,
  'AX-LG-001': laadliGovindvan,
}

export function getPlotVisualSections(slug: string, code?: string): PlotVisualSections | undefined {
  return bySlug[slug] || (code ? byCode[code] : undefined)
}
