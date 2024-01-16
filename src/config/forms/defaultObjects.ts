
export class AdObject {
  static empty = {
    id: 0,
    advertiser: '',
    title: '',
    description: '',
    link: '',
    linkTitle: '',
    adImage: '',
    isVisible: false,
    isExclusive: false,
    slug: '',
  };
}

export class AdvertiserObject {
  static empty = {
    id: 0,
    name: '',
    logo: '',
    slug: '',
  };
}

export class AppointmentObject {
  static empty = {
    id: 0,
    customer: '',
    item: '',
    assignedTo: '',
    date: '',
    slot: '',
    status: '',
  };
}

export class BrandObject {
  static empty = {
    id: 0,
    name: '',
    categoryIds: [],
    categories: [],
    shortDescription: '',
    description: '',
    slug: '',
    allowedInSearch: true,
    allowedInFilters: true,
    showOnHomePage: true,
    isPublished: true,
  };
}

export class CallObject {
  static empty = {
    id: 0,
    customer: '',
    product: '',
    assignedTo: '',
    date: '',
    status: '',
    notes: '',
  }
}

export class CategoryObject {
  static empty = {
    id: 0,
    name: '',
    orderNo: 0,
    active: true,
    parentCategoryId: 0,
  }
}

export class AttributeObject {
  static empty = {
    id: 0,
    name: '',
    type: '',
    isRequired: false,
    allowFiltering: false,
    showOnProductPage: false,
    displayOrder: 0,
    categoryId: 0,
  }
}

export class AttributeValueObject {
  static empty = {
    id: 0,
    value: '',
  }
}

export class ClaimTypeObject {
  static empty = {
    id: 0,
    name: '',
    type: '',
    description: '',
    regex: '',
    isRequired: false,
    isStatic: false,
  }
}

export class CountryObject {
  static empty = {
    id: 0,
    name: '',
    code: '',
    isoCode: '',
    isActive: false,
    comingSoon: false,
    isInMaintenanceMode: false,
  }
}

export class CurrencyObject {
  static empty = {
    id: 0,
    name: '',
    isoCode: '',
  }
}

export class CustomerObject {
  static empty = {
    id: 0,
    name: '',
    mobile: '',
    email: '',
    birthdate: '',
    gender: '',
    country: '',
    address: '',
    customerType: '',
    occupation: '',
    company: '',
    interests: [],
  }
}

export class HighlightObject {
  static empty = {
    id: 0,
    product: '',
  }
}

export class InternalNoteObject {
  static empty = {
    id: 0,
    customer: '',
    product: '',
    title: '',
    description: '',
  }
}

export class InventoryProductObject {
  static empty = {
    id: 0,
    name: '',
    description: '',
    brand: '',
    category: '',
    status: '',
    images: [],
    enableShowPrice: false,
    price: 0,
    currency: '',
    showPriceLabel: '',
    location: '',
    latitude: '',
    longitude: '',
    attributes: [],
    country: '',
    tags: [],
    pinnedIndex: 0,
    categoryIndex: 0,
    isSummerProduct: false,
    isRequestVIP: false,
    isSponsored: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    slug: '',
  }
}

export class LanguageTextObject {
  static empty = {
    id: 0,
    key: '',
    baseValue: '',
    value: '',
    resourceName: '',
  }
}

export class LanguageObject {
  static empty = {
    id: 0,
    displayName: '',
    cultureName: '',
    uiCultureName: '',
    isEnabled: false,
  }
}

export class LeadObject {
  static empty = {
    id: 0,
    name: '',
    mobile: '',
    email: '',
    interests: [],
    status: '',
    rating: '',
    priority: '',
    notes: '',
    assignedTo: '',
  }
}

export class LocationObject {
  static empty = {
    id: 0,
    name: '',
    countryId: 0,
    parentLocationId: null,
    isIncludedInApp: true,
  }
}

export class MerchantObject {
  static empty = {
    id: 0,
    name: '',
    email: '',
    category: '',
    contactName: '',
    contactNumber: '',
    location: '',
    website: '',
    agreement: '',
  }
}

export class NotificationObject {
  static empty = {
    id: 0,
    title: '',
    description: '',
    navigateTo: '',
    receiver: '',
  }
}

export class ProductObject {
  static empty = {
    id: 0,
    name: '',
    description: '',
    brand: '',
    category: '',
    owner: '',
    status: '',
    images: [],
    enableShowPrice: false,
    price: 0,
    currency: '',
    showPriceLabel: '',
    location: '',
    latitude: '',
    longitude: '',
    attributes: [],
    country: '',
    tags: [],
    pinnedIndex: 0,
    categoryIndex: 0,
    isSummerProduct: false,
    isRequestCamera: false,
    isRequestPricing: false,
    isRequestVIP: false,
    isSponsored: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    slug: '',
  }
}

export class RequestObject {
  static empty = {
    id: 0,
    requestor: '',
    product: '',
    assignedTo: '',
    appointment: '',
    status: '',
    notes: '',
  }
}

export class RoleObject {
  static empty = {
    id: 0,
    name: '',
    isDefault: false,
    isPublic: false,
  }
}

export class UserObject {
  static empty = {
    id: 0,
    name: '',
    surname: '',
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isActive: false,
    lockoutEnabled: false,
    roleNames: [],
  }
}

export class ProfileObject {
  static empty = {
    name: '',
    surname: '',
    userName: '',
    email: '',
    phoneNumber: '',
  }
}

export class ChangePasswordObject {
  static empty = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
}

export class SubscriptionObject {
  static empty = {
    id: 0,
    customer: '',
    type: '',
    from: '',
    to: '',
    isRefundAllowed: false,
    isActive: false,
    isRefunded: false,
    slug: '',
  }
}

export class TagObject {
  static empty = {
    id: 0,
    key: '',
    displayName: '',
    description: '',
  }
}

export class TextTemplateObject {
  static empty = {
    id: 0,
    name: '',
    isInlineLocalized: false,
    isLayout: false,
    layout: '',
    defaultCultureName: '',
  }
}

export class TopicObject {
  static empty = {
    id: 0,
    name: '',
  }
}

export class TopicQueryObject {
  static empty = {
    id: 0,
    keyword: '',
    count: 0,
  }
}