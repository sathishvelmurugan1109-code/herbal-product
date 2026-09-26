import bathPodiBanner from '../assets/herbal bath podi.png'
import hairOilBanner from '../assets/herbal hair oil.png'
import seekakaiBanner from '../assets/Seekakai Podi.png'
import hairPackBanner from '../assets/herbal hair pack.png'

// Product catalogue. Copy is taken from the Keerthika Sai product cards.
// `banner` is the printed poster kept in src/assets/ - it is shown in the
// Showcase section (src/sections/Showcase.jsx).
export const products = [
  {
    id: 'bath-podi',
    name: 'Herbal Bath Podi',
    tamil: 'குளியல் பொடி',
    subtitle: 'Kuliyal Podi · Natural Skin Care',
    art: 'powder',
    banner: bathPodiBanner,
    accent: '#8fae6a',
    emoji: '🥄',
    short: 'A sunrise-to-sunset bathing powder that softens, brightens and evens out skin tone.',
    description:
      'A hand-ground bathing powder made the way our grandmothers made it. Every batch is sun-dried, stone ground and packed fresh — nothing else added.',
    benefits: [
      { title: 'Even-toned skin', text: 'Balances and refines skin, reducing blemishes and dark spots.' },
      { title: 'Bright & glowing', text: 'Gives a natural glow and radiance with regular use.' },
      { title: 'Soft, smooth texture', text: 'Softens and rejuvenates the skin from the very first bath.' },
    ],
    herbs: ['Kasthuri Manjal', 'Avaram Poo', 'Rose', 'Vetiver', 'Amla', 'Curry Leaves'],
    note: 'Suitable for all ages',
  },
  {
    id: 'hair-oil',
    name: 'Herbal Hair Oil',
    tamil: 'ஹெர்பல் ஹேர் ஆயில்',
    subtitle: 'Cold-infused herbal hair oil',
    art: 'oil',
    banner: hairOilBanner,
    accent: '#d8a83c',
    emoji: '🫗',
    short: 'A slow-infused herbal oil that feeds the scalp, strengthens roots and tames hair fall.',
    description:
      'Herbs are slow-simmered in cold-pressed oil until the oil drinks up every bit of goodness. Light, non-sticky and made to be used three times a week.',
    benefits: [
      { title: 'Promotes hair growth', text: 'முடி வளர்ச்சியை ஊக்குவிக்கிறது — wakes up sleepy follicles.' },
      { title: 'Controls hair fall', text: 'முடி உதிர்வை கட்டுப்படுத்துகிறது — strengthens roots.' },
      { title: 'Deeply nourishes', text: 'கூந்தலுக்கு ஊட்டமளிக்கிறது — cools the scalp and adds shine.' },
    ],
    herbs: ['Hibiscus', 'Amla', 'Curry Leaves', 'Vetiver', 'Seekakai'],
    note: 'No mineral oil · No fragrance · No preservatives',
  },
  {
    id: 'seekakai-podi',
    name: 'Seekakai Podi',
    tamil: 'சீயக்காய் தூள்',
    subtitle: 'Herbal Seeyakkai Thool · Natural hair care',
    art: 'seekakai',
    banner: seekakaiBanner,
    accent: '#a9713c',
    emoji: '🥣',
    short: 'The original herbal shampoo — cleanses the scalp without stripping it dry.',
    description:
      'Shikakai pods are shade-dried and ground with hair-loving herbs. It cleans gently, so hair stays bouncy instead of becoming brittle.',
    benefits: [
      { title: 'Gentle natural cleanse', text: 'இயற்கையான சுத்தம் — clears the scalp and hair of buildup.' },
      { title: 'Softness & bounce', text: 'மென்மை & பளபளப்பு — hair feels softer and looks shinier.' },
      { title: 'Root nourishment', text: 'வேர்களுக்கு ஊட்டம் — feeds the roots for healthier growth.' },
    ],
    herbs: ['Seekakai', 'Amla', 'Hibiscus', 'Curry Leaves'],
    note: 'Chemical-free alternative to shampoo',
  },
  {
    id: 'hair-pack',
    name: 'Herbal Hair Pack',
    tamil: 'ஹெர்பல் ஹேர் பேக்',
    subtitle: 'Hair pack powder · Natural hair care',
    art: 'hairpack',
    banner: hairPackBanner,
    accent: '#5f8f5a',
    emoji: '🍃',
    short: 'A green clay-soft hair mask that conditions deeply and revives tired hair.',
    description:
      'Mix with water, curd or aloe gel for a spa-grade hair mask at home. Deep conditioning without a single silicone.',
    benefits: [
      { title: 'Deep conditioning', text: 'Conditions every strand and smooths the rough ends.' },
      { title: 'Strengthens roots', text: 'Reduces hair fall and breakage over the weeks.' },
      { title: 'Stunning shine', text: 'Adds a healthy, camera-ready shine to dull hair.' },
    ],
    herbs: ['Hibiscus', 'Amla', 'Curry Leaves'],
    note: 'Also promotes healthy growth',
  },
]

export const getProduct = (id) => products.find((p) => p.id === id)
