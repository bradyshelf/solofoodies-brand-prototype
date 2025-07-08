
export interface ProfileBlock {
  id: string;
  isVisible: boolean;
  data: any;
}

export interface AddressBlock {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  opening_hours: string;
}

export interface MenuBlock {
  dishes: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string;
  }>;
}

export interface ProductBlock {
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    sku: string;
    image?: string;
    order_link?: string;
  }>;
}

export interface MediaBlock {
  images: Array<{
    id: string;
    url: string;
    tag: 'dish' | 'product' | 'venue' | 'other';
    caption?: string;
  }>;
}

export interface CTAButton {
  id: string;
  label: string;
  type: 'reserve' | 'shop' | 'sample' | 'contact' | 'custom';
  link: string;
  isActive: boolean;
}

export interface CollaborationPreferences {
  types: Array<'influencer_visits' | 'product_sendouts' | 'menu_collaborations' | 'recipe_content' | 'sponsored_content' | 'event_invitations'>;
}

export interface ModularProfile {
  id?: string;
  name: string;
  description: string;
  phone: string;
  website_url: string;
  
  // Modular blocks
  address_block: AddressBlock;
  menu_block: MenuBlock;
  product_block: ProductBlock;
  media_block: MediaBlock;
  
  // CTAs (up to 2)
  cta_buttons: CTAButton[];
  
  // Collaboration preferences
  collaboration_preferences: CollaborationPreferences;
  
  // Social links
  social_links: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}
