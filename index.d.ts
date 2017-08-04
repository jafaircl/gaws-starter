// Generics
interface AdWordsEntity {
    getEntityType?(): string
}

interface AdWordsIterator<E extends AdWordsEntity | {}> {
    hasNext?(): boolean
    next?(): E
    totalNumEntities?(): number
}

interface AdWordsBasicSelector<E extends AdWordsEntity | {}> {
    get?(): AdWordsIterator<E>
    withCondition?(condition: string): AdWordsBasicSelector<E>
    withIds?(ids: Array<Array<number>> | Array<number>): AdWordsBasicSelector<E>
}

interface AdWordsSelector<E extends AdWordsEntity | {}> extends AdWordsBasicSelector<E> {
    forDateRange?(dateRange: string): AdWordsSelector<E>
    forDateRange?(dateFrom: AdWordsDate | string, dateTo: AdWordsDate | string): AdWordsSelector<E>
    orderBy?(orderBy: string): AdWordsSelector<E>
    withLimit?(limit: number): AdWordsSelector<E>
}

interface AdWordsBuilder<E extends AdWordsEntity> {
    build?(): AdWordsOperation<E>
}

interface AdWordsOperation<E extends AdWordsEntity> {
    getErrors?(): Array<string>
    getResult?(): E
    isSuccessful?(): boolean
}

interface AdWordsStats {
    getAverageCpc?(): number
    getAverageCpm?(): number
    getAverageCpv?(): number
    getAveragePageviews?(): number
    getAveragePosition?(): number
    getAverageTimeOnSite?(): number
    getBounceRage?(): number
    getClicks?(): number
    getConversionRate?(): number
    getConversions?(): number
    getCost?(): number
    getCtr?(): number
    getImpressions?(): number
    getViewRate?(): number
    getViews?(): number
}

interface AdWordsUrls {
    getCustomParameters?(): Object
    getTrackingTemplate?(): string
}

interface AdWordsBidding {
    getStrategy?(): BiddingStrategy
    getStrategySource?(): BiddingStrategySource
    getStrategyType?(): string
}

interface AdWordsTargeting<A, E> {
    audiences?(): AdWordsSelector<A>
    exculdedAudiences?(): AdWordsSelector<E>
}

// Ad Customizers
interface AdCustomizerItem extends AdWordsEntity,
                                   hasMobilePreferred,
                                   hasStartAndEndDate,
                                   hasSchedules {
    clearTargetAdGroup?(): void
    clearTargetCampaign?(): void
    clearTargetKeyword?(): void
    getAttributeValue?(name: string): number | string
    getAttributeValues?(): Object // TODO: AttributeValues
    getId?(): number
    getTargetAdGroupName?(): string | null
    getTargetCampaignName?(): string | null
    getTargetKeywordText?(): string | null
    remove?(): void
    setAttributeValue?(name: string, value: string | number | null): void
    setAttributeValues?(attributeValues: Object): void // TODO: AttributeValues
    setTargetAdGroup?(campaignName: string, adGroupName: string): void
    setTargetCampaign?(campaignName: string): void
    setTargetKeyword(keyword?: string): void
}

interface AdCustomizerItemBuilder<AdCustomizerItem> extends AdWordsBuilder<AdCustomizerItem>,
                                                            hasMobilePreferredBuilder<AdCustomizerItemBuilder<AdCustomizerItem>>,
                                                            hasSchedulesBuilder<AdCustomizerItemBuilder<AdCustomizerItem>>,
                                                            hasStartAndEndDateBuilder<AdCustomizerItemBuilder<AdCustomizerItem>> {
    withAttributeValue?(name: string, value: Object): AdCustomizerItemBuilder<AdCustomizerItem>
    withAttributeValues?(attributeValues: Object): AdCustomizerItemBuilder<AdCustomizerItem> // TODO: AttributeValues
    withTargetAdGroup?(campaignName: string, adGroup: string): AdCustomizerItemBuilder<AdCustomizerItem>
    withTargetCampaign?(campaignName: string): AdCustomizerItemBuilder<AdCustomizerItem>
    withTargetKeyword?(keyword: string): AdCustomizerItemBuilder<AdCustomizerItem>
}

interface AdCustomizerSource extends AdWordsEntity {
    adCustomizerItemBuilder?(): AdCustomizerItemBuilder<AdCustomizerItem>
    getAttributes?(): Object // TODO: AttributeValues
    getName?(): string
    items(): AdWordsSelector<AdCustomizerItem>
}

interface AdCustomizerSourceBuilder<AdCustomizerSource> extends AdWordsBuilder<AdCustomizerSource> {
    addAttribute?(name: string, type: string): AdCustomizerSourceBuilder<AdCustomizerSource>
    addAttributes?(attributes: Object): AdCustomizerSourceBuilder<AdCustomizerSource>
    withName?(name: string): AdCustomizerSourceBuilder<AdCustomizerSource>
}

// Ad extensions
interface AccountExtensions {
    callouts?(): AdWordsSelector<Callout>
    message?(): AdWordsSelector<Message>
    mobileApps?(): AdWordsSelector<MobileApp>
    reviews?(): AdWordsSelector<Review>
    sitelinks?(): AdWordsSelector<Sitelink>
    snippets?(): AdWordsSelector<Snippet>
}

interface AdGroupExtensions extends AccountExtensions {
    phoneNumbers?(): AdWordsSelector<PhoneNumber>
}

interface CampaignExtensions extends AdGroupExtensions { }

interface AdWordsAdExtensions extends AdGroupExtensions {
    newCalloutBuilder?(): CalloutBuilder<Callout>
    newMessageBuilder?(): MessageBuilder<Message>
    newMobileAppBuilder?(): MobileAppBuilder<MobileApp>
    newPhoneNumberBuilder?(): PhoneNumberBuilder<PhoneNumber>
    newReviewBuilder?(): ReviewBuilder<Review>
    newSitelinkBuilder?(): SitelinkBuilder<Sitelink>
    newSnippetBuilder?(): SnippetBuilder<Snippet>
}

interface Callout extends AdWordsEntity,
                          hasMobilePreferred,
                          hasStartAndEndDate,
                          hasSchedules,
                          hasStats,
                          isAdGroupChild {
    getId?(): number
    getText?(): string
    setText?(text: string): void
}

interface CalloutBuilder<Callout> extends AdWordsBuilder<Callout>,
                                          hasMobilePreferredBuilder<CalloutBuilder<Callout>>,
                                          hasSchedulesBuilder<CalloutBuilder<Callout>>,
                                          hasStartAndEndDateBuilder<CalloutBuilder<Callout>> {
    withText(text: string): CalloutBuilder<Callout>
}

interface Message extends AdWordsEntity,
                          hasMobilePreferred,
                          hasStartAndEndDate,
                          hasSchedules,
                          hasStats,
                          isAdGroupChild {
    getBusinessName?(): string
    getCountryCode?(): string
    getExtensionText?(): string
    getId?(): number
    getMessageText?(): string
    getPhoneNumber?(): string
    setBusinessName?(businessName: string): void
    setCountryCode?(countryCode: string): void
    setExtensionText?(extensionText: string): void
    setMessageText?(messageText: string): void
    setPhoneNumber?(phoneNumber: string): void
}

interface MessageBuilder<Message> extends AdWordsBuilder<Message>,
                                          hasMobilePreferredBuilder<MessageBuilder<Message>>,
                                          hasStartAndEndDateBuilder<MessageBuilder<Message>>,
                                          hasSchedulesBuilder<MessageBuilder<Message>> {
    withBusinessName?(businessName: string): MessageBuilder<Message>
    withCountryCode?(countryCode: string): MessageBuilder<Message>
    withExtensionText?(extensionText: string): MessageBuilder<Message>
    withMessageText?(messageText: string): MessageBuilder<Message>
    withPhoneNumber?(phoneNumber: string): MessageBuilder<Message>
}

interface MobileApp extends AdWordsEntity,
                            hasMobilePreferred,
                            hasStartAndEndDate,
                            hasSchedules,
                            hasStats,
                            isAdGroupChild {
    clearLinkUrl?(): void
    getAppId?(): string
    getId?(): number
    getLinkText?(): string
    getStore?(): AppStore
    setAppId?(appId: string): void
    setLinkText?(linkText: string): void
    setStore?(): AppStore
    urls?(): MobileAppUrls
}

interface MobileAppUrls extends AdWordsUrls, hasGetFinalUrl, hasSetFinalUrl, hasSetTrackingTemplate {
    clearMobileFinalUrl?(): void
    clearTrackingTemplate?(): void
}

interface MobileAppBuilder<MobileApp> extends AdWordsBuilder<MobileApp>,
                                              hasMobilePreferredBuilder<MobileAppBuilder<MobileApp>>,
                                              hasStartAndEndDateBuilder<MobileAppBuilder<MobileApp>>,
                                              hasSchedulesBuilder<MobileAppBuilder<MobileApp>>,
                                              hasTrackingTemplateBuilder<MobileAppBuilder<MobileApp>>,
                                              hasFinalUrlBuilder<MobileAppBuilder<MobileApp>> {
    withAppId?(appId: string): MobileAppBuilder<MobileApp>
    withLinkText?(linkText: string): MobileAppBuilder<MobileApp>
    withStore?(store: AppStore): MobileAppBuilder<MobileApp>
}

interface PhoneNumber extends AdWordsEntity,
                              hasMobilePreferred,
                              hasSchedules,
                              hasStartAndEndDate,
                              hasStats,
                              isAdGroupChild {
    getCountry?(): string,
    getId?(): number
    getPhoneNumber?(): string
    setCountry?(country: string): void
    setPhoneNumber?(phoneNumber: string): void
}

interface PhoneNumberBuilder<PhoneNumber> extends AdWordsBuilder<PhoneNumber>,
                                                  hasMobilePreferredBuilder<PhoneNumberBuilder<PhoneNumber>>,
                                                  hasStartAndEndDateBuilder<PhoneNumberBuilder<PhoneNumber>>,
                                                  hasSchedulesBuilder<PhoneNumberBuilder<PhoneNumber>> {
    withCountry?(country: string): PhoneNumberBuilder<PhoneNumber>
    withPhoneNumber?(phoneNumber: string): PhoneNumberBuilder<PhoneNumber>
}

interface Review extends AdWordsEntity,
                         hasMobilePreferred,
                         hasSchedules,
                         hasStartAndEndDate,
                         hasStats,
                         isAdGroupChild {
    getId?(): number
    getSourceName?(): string
    getSourceUrl?(): string
    getText?(): string
    isExactlyQuoted?(): boolean
    setExactlyQuoted?(isExactlyQuoted: boolean): void
    setSourceName?(sourceName: string): void
    setSourceUrl?(sourceUrl: string): void
    setText?(text: string): void
}

interface ReviewBuilder<Review> extends AdWordsBuilder<Review>,
                                        hasMobilePreferredBuilder<ReviewBuilder<Review>>,
                                        hasStartAndEndDateBuilder<ReviewBuilder<Review>>,
                                        hasSchedulesBuilder<ReviewBuilder<Review>> {
    withExactlyQuoted?(exactlyQuoted: boolean): ReviewBuilder<Review>
    withSourceName?(sourceName: string): ReviewBuilder<Review>
    withSourceUrl?(sourceUrl: string): ReviewBuilder<Review>
    withText?(text: string): ReviewBuilder<Review>
}

interface Sitelink extends AdWordsEntity,
                           hasMobilePreferred,
                           hasSchedules,
                           hasStartAndEndDate,
                           hasStats,
                           isAdGroupChild {
    clearDescription1?(): void
    clearDescription2?(): void
    clearLinkUrl?(): void
    getDescription1?(): string
    getDescription2?(): string
    getId?(): number
    getLinkText?(): string
    setDescription1?(description1: string): void
    setDescription2?(description2: string): void
    setLinkText?(linkText: string): void
    urls?(): SitelinkUrls
}

interface SitelinkUrls extends AdWordsUrls, hasSetTrackingTemplate, hasGetFinalUrl, hasSetFinalUrl {
    clearMobileFinalUrl?(): void
}

interface SitelinkBuilder<Sitelink> extends AdWordsBuilder<Sitelink>,
                                            hasMobilePreferredBuilder<SitelinkBuilder<Sitelink>>,
                                            hasStartAndEndDateBuilder<SitelinkBuilder<Sitelink>>,
                                            hasSchedulesBuilder<SitelinkBuilder<Sitelink>>,
                                            hasTrackingTemplateBuilder<SitelinkBuilder<Sitelink>>,
                                            hasFinalUrlBuilder<SitelinkBuilder<Sitelink>> {
    withDescription1?(description1: string): SitelinkBuilder<Sitelink>
    withDescription2?(description2: string): SitelinkBuilder<Sitelink>
    withLinkText?(linkText: string): SitelinkBuilder<Sitelink>
}

interface Snippet extends AdWordsEntity,
                          hasMobilePreferred,
                          hasSchedules,
                          hasStartAndEndDate,
                          hasStats,
                          isAdGroupChild {
    getHeader?(): string
    getId?(): number
    getValues?(): Array<string>
    setHeader?(header: string): void
    setValues?(values: Array<string>): void
}

interface SnippetBuilder<Snippet> extends AdWordsBuilder<Snippet>,
                                          hasMobilePreferredBuilder<SnippetBuilder<Snippet>>,
                                          hasStartAndEndDateBuilder<SnippetBuilder<Snippet>>,
                                          hasSchedulesBuilder<SnippetBuilder<Snippet>> {
    withHeader?(header: string): SnippetBuilder<Snippet>
    withValues?(values: Array<string>): SnippetBuilder<Snippet>
}

// Ad Group
interface AdGroup extends AdWordsEntity, canBeEnabled, hasExtensions, hasLabels, hasStats, isCampaignChild {
    adParams?(): AdWordsSelector<AdParam>
    ads?(): AdWordsSelector<Ad>
    bidding?(): AdGroupBidding
    clearNegativeKeyword?(keywordText: string): void
    devices?(): AdGroupDevices
    display?(): AdGroupDisplay
    extensions?(): AdGroupExtensions
    getId?(): number
    getName?(): string
    isRemoved?(): boolean
    keywords?(): AdWordsSelector<Keyword>
    negativeKeywords?(): AdWordsSelector<NegativeKeyword>
    newAd?(): AdBuilderSpace
    newKeywordBuilder?(): KeywordBuilder<Keyword>
    setName?(name: string): void
    targeting?(): AdGroupTargeting
    urls?(): AdGroupUrls
}

interface AdGroupUrls extends AdWordsUrls, hasSetTrackingTemplate {
    clearTrackingTemplate?(): void
}

interface AdGroupBuilder<AdGroup> extends AdWordsBuilder<AdGroup>,
                                          hasBiddingStrategyBuilder<AdGroupBuilder<AdGroup>>,
                                          hasTrackingTemplateBuilder<AdGroupBuilder<AdGroup>> {
    withCpa?(cpa: number): AdGroupBuilder<AdGroup>
    withCpc?(cpc: number): AdGroupBuilder<AdGroup>
    withCpm?(cpm: number): AdGroupBuilder<AdGroup>
    withName?(name: string): AdGroupBuilder<AdGroup>
    withStatus?(status: string): AdGroupBuilder<AdGroup>
}

interface AdGroupBidding extends KeywordBidding {
    getCpa?(): number
    setCpa?(cpa: number): void
}

interface AdGroupDevices {
    clearDesktopBidModifier?(): void
    clearMobileBidModifier?(): void
    clearTabletBidModifier?(): void
    getDesktopBidModifier?(): number
    getMobileBidModifier?(): number
    getTabletBidModifier?(): number
    setDesktopBidModifier?(modifier: number): void
    setMobileBidModifier?(modifier: number): void
    setTabletBidModifier?(modifier: number): void
}

interface AdGroupTargeting<AdWordsEntity, AdWordsEntity> extends AdWordsTargeting<AdWordsEntity, AdWordsEntity> { // TODO: SearchAdGroupAudience, SearchAdGroupExcludedAudience
    getTargetingSetting?(): string
    newUserListBuilder?(): AdWordsBuilder<AdWordsEntity> // TODO: SearchAdGroupAudienceBuilder<SearchAdGroupAudience>
    setTargetingSetting?(criterionTypeGroup: CriterionTypeGroup, targetingSetting: TargetingSetting)
}

// Ad Param
interface AdParam extends AdWordsEntity {
    getAdGroup?(): AdGroup
    getInde?(): number
    getInsertionText?(): string
    getKeyword?(): AdWordsEntity // TODO: Keyword
    remove?(): void
    setInsertionText?(insertionText: string): void
}

// Ad
interface Ad extends AdWordsEntity,
                     canBeEnabled,
                     hasLabels,
                     hasStats,
                     isAdGroupChild {
    asType?(): AdViewSpace
    getApprovalStatus?(): ApprovalStatus
    getDisapprovalReasons?(): Array<string>
    getId?(): number
    getPolicyApprovalStatus?(): PolicyApprovalStatus
    getPolicyTopics?(): Array<PolicyTopic>
    getType?(): AdType
    isType?(): AdTypeSpace
    remove?(): void
    urls?(): AdUrls
}

interface AdBuilder<T> extends AdWordsBuilder<T>, hasFinalUrlBuilder<T>, hasTrackingTemplateBuilder<T> { }

interface AdBuilderSpace {
    expandedTextAdBuilder?(): ExpandedTextAdBuilder<ExpandedTextAd>
    gmailImageAdBuilder?(): GmailImageAdBuilder<GmailImageAd>
    gmailMultiProductAdBuilder?(): GmailMultiProductAdBuilder<GmailMultiProductAd>
    gmailSinglePromotionAdBuilder?(): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    html5AdBuilder?(): Html5AdBuilder<Html5Ad>
    imageAdBuilder?(): ImageAdBuilder<ImageAd>
    responsiveDisplayAdBuilder?(): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
}

interface AdTypeSpace {
    expandedTextAd?(): boolean
    gmailImageAd?(): boolean
    gmailMultiProductAd?(): boolean
    gmailSinglePromotionAd?(): boolean
    html5Ad?(): boolean
    imageAd?(): boolean
    responsiveDisplayAd?(): boolean
}

interface AdUrls extends AdWordsUrls, hasGetFinalUrl { }

interface AdViewSpace {
    expandedTextAd?(): ExpandedTextAd
    gmailImageAd?(): GmailImageAd
    gmailMultiProductAd?(): GmailMultiProductAd
    gmailSinglePromotionAd?(): GmailSinglePromotionAd
    html5Ad?(): Html5Ad 
    imageAd?(): ImageAd
    responsiveDisplayAd?(): ResponsiveDisplayAd
}

interface ExpandedTextAd extends Ad {
    getDescription?(): string
    getHeadlinePart1?(): string
    getHeadlinePart2?(): string
    getPath1?(): string
    getPath2?(): string
}

interface ExpandedTextAdBuilder<ExpandedTextAd> extends AdBuilder<ExpandedTextAdBuilder<ExpandedTextAd>> {
    withDescription?(descriptions: string): ExpandedTextAdBuilder<ExpandedTextAd>
    withHeadlinePart1?(headline1: string): ExpandedTextAdBuilder<ExpandedTextAd>
    withHeadlinePart2?(headline2: string): ExpandedTextAdBuilder<ExpandedTextAd>
    withPath1?(path1: string): ExpandedTextAdBuilder<ExpandedTextAd>
    withPath2?(path2: string): ExpandedTextAdBuilder<ExpandedTextAd>
}

interface GmailImageAd extends Ad {
    getAdvertiser?(): string
    getDescription?(): string
    getImage?(): any // TODO: Media
    getLogo?(): any // TODO: Media
    getName?(): string
    getSubject?(): string
}

interface GmailImageAdBuilder<GmailImageAd> extends AdBuilder<GmailImageAdBuilder<GmailImageAd>> {
    withAdvertiser?(advertiser: string): GmailImageAdBuilder<GmailImageAd>
    withDescription?(description: string): GmailImageAdBuilder<GmailImageAd>
    withDisplayUrl?(displayUrl: string): GmailImageAdBuilder<GmailImageAd>
    withImage?(image: any): GmailImageAdBuilder<GmailImageAd> // TODO: Media
    withLogo?(logo: any): GmailImageAdBuilder<GmailImageAd> // TODO: Media
    withName?(name: string): GmailImageAdBuilder<GmailImageAd>
    withSubject?(subject: string): GmailImageAdBuilder<GmailImageAd>
}

interface GmailMultiProductAd extends Ad {
    getAdvertiser?(): string
    getContent?(): string
    getDescription?(): string
    getHeader?(): any // TODO: Media
    getHeadline?(): string
    getHeadlineColor?(): string
    getItemButtonCallsToAction?(): Array<string>
    getItemButtonColor?(): Array<string>
    getItemButtonFinalMobileUrls?(): Array<string>
    getItemButtonFinalUrls?(): Array<string>
    getItemButtonTextColors?(): Array<string>
    getItemButtonTrackingTemplates?(): Array<string>
    getItemImages?(): Array<any> // TODO: Media
    getItemTitleColors?(): Array<string>
    getItemTitles?(): Array<string>
    getLogo?(): any // TODO: Media
    getName?(): string
    getSubject?(): string
}

interface GmailMultiProductAdBuilder<GmailMultiProductAd> extends AdBuilder<GmailMultiProductAdBuilder<GmailImageAd>> {
    withAdvertiser?(advertiser: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withContent?(content: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withDescription?(description: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withHeader?(header: any): GmailMultiProductAdBuilder<GmailMultiProductAd> // TODO: Media
    withHeadline?(headline: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withHeadlineColor?(headlineColor: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withItemButtonCallsToAction(itemCallsToAction: Array<string>): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withItemButtonFinalMobileUrls?(itemButtonFinalMobileUrls: Array<string>): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withItemButtonFinalUrls?(itemButtonFinalUrls: Array<string>): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withItemButtonTrackingTemplates?(itemButtonTrackingTemplates: Array<string>): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withItemImages?(itemImages: Array<any>): GmailMultiProductAdBuilder<GmailMultiProductAd> // TODO: Media
    withItemTitle?(itemTitles: Array<string>): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withLogo?(logo: any): GmailMultiProductAdBuilder<GmailMultiProductAd> // TODO: Media
    withName?(name: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
    withSubject?(subject: string): GmailMultiProductAdBuilder<GmailMultiProductAd>
}

interface GmailSinglePromotionAd extends Ad {
    getAdvertiser?(): string
    getCallToAction?(): string
    getCallToActionButtonColor?(): string
    getCallToActionTextColor?(): string
    getContent?(): string
    getDescription?(): string
    getHeader?(): any // TODO: Media
    getHeadline?(): string
    getHeadlineColor?(): string
    getImage?(): any // TODO: Media
    getLogo?(): any // TODO: Media
    getName?(): string
    getSubject?(): string
}

interface GmailSinglePromotionAdBuilder<GmailSinglePromotionAd> extends AdBuilder<GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>> {
    withAdvertiser?(advertiser: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withCallToAction?(callToAction: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withCallToActionButtonColor?(callToActionButtonColor: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withCallToActionTextColor?(callToActionTextColor: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withContent?(content: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withDescription?(description: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withDisplayUrl?(displayUrl: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withHeader?(header: any): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd> // TODO: Media
    withHeadline?(headline: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withHeadlineColor?(headlineColor: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withImage?(image: any): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd> // TODO: Media
    withLogo?(logo: any): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd> // TODO: Media
    withName?(name: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
    withSubject?(subject: string): GmailSinglePromotionAdBuilder<GmailSinglePromotionAd>
}

interface Html5Ad extends Ad {
    getEntryPoint?(): string
    getMediaBundle?(): any // TODO: Media
    getName?(): string
}

interface Html5AdBuilder<Html5Ad> extends AdBuilder<Html5AdBuilder<Html5Ad>> {
    withDisplayUrl?(displayUrl: string): Html5AdBuilder<Html5Ad>
    withEntryPoint?(entryPoint: string): Html5AdBuilder<Html5Ad>
    withMediaBundle?(mediaBundle: any): Html5AdBuilder<Html5Ad> // TODO: Media
    withName?(name: string): Html5AdBuilder<Html5Ad>
    withDimensions?(dimensions: string): Html5AdBuilder<Html5Ad>
}

interface ImageAd extends Ad {
    getImage?(): any // TODO: Media
    getName?(): string
}

interface ImageAdBuilder<ImageAd> extends AdBuilder<ImageAdBuilder<ImageAd>> {
    withDisplayUrl?(displayUrl: string): ImageAdBuilder<ImageAd>
    withImage?(image: any): ImageAdBuilder<ImageAd> // TODO: Media
    withName?(name: string): ImageAdBuilder<ImageAd>
}

interface PolicyTopic {
    getId?(): string
    getName?(): string
    getType?(): string
}

interface ResponsiveDisplayAd extends Ad {
    getBusinessName?(): string
    getDescription?(): string
    getLogoImage?(): any // TODO: Media
    getLongHeadline?(): string
    getMarketingImage?(): any // TODO: Media
    getShortHeadline?(): string
}

interface ResponsiveDisplayAdBuilder<ResponsiveDisplayAd> extends AdBuilder<ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>> {
    withBusinessName?(businessName: string): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
    withDescription?(description: string): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
    withLogoImage?(logo: any): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
    withLongHeadline?(longHeadline: string): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
    withMarketingImage?(marketingImage: any): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd> // TODO: Media
    withShortHeadline?(shortHeadline: string): ResponsiveDisplayAdBuilder<ResponsiveDisplayAd>
}

// Bidding Strategies
interface BiddingStrategy extends hasStats {
    adGroups?(): AdWordsSelector<AdGroup>
    campaigns?(): AdWordsSelector<Campaign>
    getId?(): number
    getName?(): string
    getType?(): string
    keywords?(): AdWordsSelector<AdWordsEntity> // TODO: Keywords
    shoppingAdGroups?(): AdWordsSelector<AdWordsEntity> // TODO: ShoppingAdGroup
    shoppingCampaigns?(): AdWordsSelector<AdWordsEntity> // TODO: ShoppingCampaigns
}

// Budget Orders
interface BillingAccount {
    getId?(): number
    getName?(): string
    getPrimaryBillingId?(): string
    getSecondaryBillingId?(): string
}

interface BudgetOrder {
    getBillingAccount?(): BillingAccount
    getEndDatetime?(): AdWordsDate
    getId?(): number
    getName?(): string
    getPoNumber?(): number
    getSpendingLimit?(): number
    getStartDateTime?(): AdWordsDate
    getTotalAdjustments?(): number
}

// Budgets
interface Budget extends AdWordsEntity, hasStats {
    campaigns?(): AdWordsSelector<Campaign>
    getAmount?(): number
    getDeliveryMethod?(): string
    getId?(): number
    getName?(): string
    isExplicitlyShared?(): boolean
    setAmount?(amount: number): void
}

// Bulk Uploads
interface BulkUploads {
    newCsvUpload?(columnNames: Array<string>, optArgs: FileUploadArguments): CsvUpload
    newFileUpload?(sheet: GoogleAppsScript.Spreadsheet.Sheet, optArgs: FileUploadArguments): FileUpload
    newFileUpload?(blob: GoogleAppsScript.Base.Blob, optArgs: FileUploadArguments): FileUpload
    newFileUpload?(file: GoogleAppsScript.Drive.File, otArgs: FileUploadArguments): FileUpload
}

interface BulkUpload<T> {
    apply?(): void
    forCampaignManagement?(): T
    forOfflineConversions?(): T
    preview?(): void
    setFileName?(fileName: string): T
}

interface FileUpload extends BulkUpload<FileUpload> { }

interface CsvUpload extends BulkUpload<CsvUpload> {
    append?(row: Object): CsvUpload
}

interface FileUploadArguments {
    fileLocale?: string
    moneyInMicros?: boolean
    timeZone?: string
}

// Campaign
interface Campaign extends AdWordsEntity, canBeEnabled, hasLabels, hasStartAndEndDate, hasStats {
    adGroups?(): AdWordsSelector<AdGroup>
    addAdSchedule?(adSchedule: AdWordsEntity): AdWordsOperation<AdWordsEntity> // TODO: AdSchedule
    addAdSchedule?(dayOfWeek: DayOfWeekString, startHour: number, startMinute: number, endHour: number, endMinute: number, bidModifier: number): AdWordsOperation<AdWordsEntity> // TODO: AdSchedule
    addCallout?(calloutExtension: Callout): AdWordsOperation<Callout>
    addExcludedPlacementList?(excludedPlacementList: ExcludedPlacementList): void
    addLocation?(locationId: number): AdWordsOperation<AdWordsEntity> // TODO: Location
    addLocation?(location: AdWordsEntity): AdWordsOperation<AdWordsEntity> // TODO: Location
    addLocation?(location: LocationObject): AdWordsOperation<AdWordsEntity> // TODO: Location
    addLocation?(locationId: number, bidModifier: number): AdWordsOperation<AdWordsEntity> // TODO: Location
    addMessage?(messageExtension: Message): AdWordsOperation<Message>
    addMobileApp?(mobileAppExtension: MobileApp): AdWordsOperation<MobileApp>
    addNegativeKeywordLIst?(negativeKeywordList: AdWordsEntity): void // TODO: NegativeKeywordList
    addPhoneNumber?(phoneNumberExtension: PhoneNumber): AdWordsOperation<PhoneNumber>
    addProximity?(proximity: AdWordsEntity | TargetedProximityObject): AdWordsOperation<AdWordsEntity> // TODO: TargetedProximity
    addProximity?(latitude: number, longitude: number, radius: number, radiusUnits: RadiusUnits, optArgs: { bidModifier: number, address: AddressObject}): AdWordsOperation<AdWordsEntity> // TODO: TargetedProximity
    addReview?(reviewExtension: Review): AdWordsOperation<Review>
    addSiteLink?(sitelinkExtension: Sitelink): AdWordsOperation<Sitelink>
    addSnippet?(snippetExtension: Snippet): AdWordsOperation<Snippet>
    ads?(): AdWordsSelector<Ad>
    bidding?(): CampaignBidding
    createNegativeKeyword?(keywordText: string): void
    display?(): CampaignDisplay
    excludeLocation?(location: AdWordsEntity): AdWordsOperation<AdWordsEntity> // TODO: ExcludedLocation
    excludeLocation?(locationId: number): AdWordsOperation<AdWordsEntity> // TODO: ExcludedLcoation
    excludeLocation?(location: { id: number }): AdWordsOperation<AdWordsEntity> // TODO: ExcludedLocation
    excludedPlacementLists?(): AdWordsSelector<ExcludedPlacementList>
    extensions?(): CampaignExtensions
    getAdRotationType?(): AdRotationType
    getBiddingStrategyType?(): BiddingStrategyString
    getBudget?(): Budget
    getId?(): number
    getName?(): string
    isRemoved?(): boolean
    keywords?(): AdWordsSelector<Keyword>
    negativeKeywordLists?(): AdWordsSelector<AdWordsEntity> // TODO: NegativeKeywordList
    negativeKeywords?(): AdWordsSelector<NegativeKeyword>
    newAdGroupBuilder?(): AdGroupBuilder<AdGroup>
    removeCallout?(calloutExtension: Callout): void
    removeExcludedPlacementList?(excludedPlacementList: ExcludedPlacementList): void
    removeMessage?(message: Message): void
    removeMobileApp?(mobileApp: MobileApp): void
    removeNegativeKeywordList?(negativeKeywordList: AdWordsEntity): void // TODO: NegativeKeywordList
    removePhoneNumber?(phoneNumber: PhoneNumber): void
    removeReview?(review: Review): void
    removeSitelink?(sitelkin: Sitelink): void
    removeSnippet?(snippet: Snippet): void
    setAdRotationType?(adRotationType: AdRotationType): void
    setName?(name: string): void
    targeting?(): CampaignTargeting
    urls?(): CampaignUrls
}

interface CampaignBidding extends AdWordsBidding, canSetBiddingStrategy { }

interface CampaignTargeting<AdWordsEntity, AdWordsEntity> extends AdWordsTargeting<AdWordsEntity, AdWordsEntity> { // TODO: SearchCampaignAudience, SearchCampaignExcludedAudience
    adSchedules?(): AdWordsSelector<AdWordsEntity> // TODO: AdSchedule
    excludedContentLabels?(): AdWordsEntity // TODO: ExcludedContentLabel
    excludedLocations?(): AdWordsSelector<AdWordsEntity> // TODO: ExcludedLocation
    getTargetingSetting?(criterionTypeGroup: CriterionTypeGroup): TargetingSetting
    languages?(): AdWordsSelector<AdWordsEntity> // TODO: Languages
    newUserListBuilder?(): AdWordsBuilder<AdWordsEntity> // TODO: SearchCampaignAudienceBuilder
    platforms?(): AdWordsSelector<AdWordsEntity> // TODO: Platform
    setTargetingSetting?(criterionTypeGroup: CriterionTypeGroup, targetingSetting: TargetingSetting): void
    targetedLocations?(): AdWordsSelector<AdWordsEntity> // TODO: TargetedLocation
    targetedProximities?(): AdWordsSelector<AdWordsEntity> // TODO: TargetedProximity
}

interface CampaignUrls extends AdWordsUrls, hasSetTrackingTemplate {
    clearTrackingTemplate?(): void
}


// Common
interface CurrentAccount extends AdWordsEntity, hasStats {
    addCallout?(calloutExtension: Callout): AdWordsOperation<Callout>
    addMobileApp?(mobileAppExtension: MobileApp): AdWordsOperation<MobileApp>
    addReview?(reviewExtension: Review): AdWordsOperation<Review>
    addSnippet?(snippetExtension: Snippet): AdWordsOperation<Snippet>
    extensions?(): AccountExtensions
    getCurrencyCode?(): string
    getCustomerId?(): string
    getName?(): string
    getTimeZone?(): string
    removeCallout?(calloutExtension: Callout): void
    removeMobileApp?(mobileAppExtension: MobileApp): void
    removeReview?(reviewExtension: Review): void
    removeSnippet?(snippetExtension: Snippet): void
}

interface ExecutionInfo {
    getRemainingCreateQuota?(): number
    getRemainingGetQuota?(): number
    getRemainingTime?(): number
    isPreview?(): boolean
}

// Display
interface DisplayBuilder<T> extends AdWordsBuilder<T> {
    exclude?(): AdWordsOperation<T>
    withCpc?(cpc: number): T
    withCpm?(cpm: number): T
}

interface DisplayBidding extends AdWordsBidding {
    clearCpc?(): void
    clearCpm?(): void
    getCpc?(): number
    getCpm?(): number
    setCpc?(cpc: number): void
    setCpm?(cpm: number): void
}

interface Audience extends ExcludedAudience, hasStats {
    bidding?(): AudienceBidding
    isEnabled?(): boolean
    isPaused?(): boolean
}

interface ExcludedAudience extends isAdGroupChild {
    getAudienceId?(): number
    getAudienceType?(): AudienceType
    getId?(): number
    remove?(): void
}

interface AudienceBuilder<Audience> extends DisplayBuilder<AudienceBuilder<Audience>> {
    withAudience?(userList: any): AudienceBuilder<Audience> // TODO: UserList
    withAudienceId?(audienceId: number): AudienceBuilder<Audience>
    withAudienceType?(audienceType: AudienceType): AudienceBuilder<Audience>
}

interface AudienceBidding extends DisplayBidding { }

interface DisplayKeyword extends ExcludedDisplayKeyword, hasStats {
    bidding?(): DisplayKeywordBidding
}

interface ExcludedDisplayKeyword extends isAdGroupChild {
    getId?(): number
    getText?(): string
    remove?(): void
}

interface DisplayKeywordBuilder<DisplayKeyword> extends DisplayBuilder<DisplayKeywordBuilder<DisplayKeyword>> {
    withText?(text: string): DisplayKeywordBuilder<DisplayKeyword>
}

interface DisplayKeywordBidding extends DisplayBidding, canSetBiddingStrategy {
    clearStrategy?(): void
}

interface Placement extends ExcludedPlacement, hasStats {
    bidding?(): PlacementBidding
    isEnabled?(): boolean
    isManaged?(): boolean
    isPaused?(): boolean
}

interface ExcludedPlacement extends isAdGroupChild {
    getId?(): number
    getUrl?(): string
    remove?(): void
}

interface PlacementBuilder<Placement> extends DisplayBuilder<PlacementBuilder<Placement>> {
    withUrl?(url: string): PlacementBuilder<Placement>
}

interface PlacementBidding extends DisplayBidding, canSetBiddingStrategy {
    clearStrategy?(): void
}

interface Topic extends ExcludedTopic, hasStats {
    bidding?(): TopicBidding
    isEnabled?(): boolean
    isPaused?(): boolean
}

interface ExcludedTopic extends isAdGroupChild {
    getId?(): number
    getTopicId?(): number
    remove?(): void
}

interface TopicBuilder<Topic> extends DisplayBuilder<TopicBuilder<Topic>> {
    withTopicId?(topicId: number): TopicBuilder<Topic>
}

interface TopicBidding extends DisplayBidding { }

interface AdGroupDisplay extends CampaignDisplay { }

interface CampaignDisplay extends Display {
    excludedAudiences?(): AdWordsSelector<ExcludedAudience>
    excludedKeywords?(): AdWordsSelector<ExcludedDisplayKeyword>
    excludedPlacements?(): AdWordsSelector<ExcludedPlacement>
    excludedTopics?(): AdWordsSelector<Topic>
    newAudienceBuilder?(): AudienceBuilder<Audience>
    newKeywordBuilder?(): DisplayKeywordBuilder<DisplayKeyword>
    newPlacementBuilder?(): PlacementBuilder<Placement>
    newTopicBuilder?(): TopicBuilder<Topic>
}

interface Display {
    audiences?(): AdWordsSelector<Audience>
    keywords?(): AdWordsSelector<DisplayKeyword>
    placements?(): AdWordsSelector<Placement>
    topics?(): AdWordsSelector<Topic>
}

// Keywords
interface Keyword extends AdWordsEntity, canBeEnabled, hasLabels, hasStats, isAdGroupChild {
    adParams?(): AdWordsSelector<AdParam>
    bidding?(): KeywordBidding
    clearDesinationUrl?(): void
    getApprovalStatus?(): ApprovalStatus
    getFirstPageCpc?(): number
    getId?(): number
    getMatchType?(): MatchType
    getQualityScore?(): number
    getText?(): string
    getTopOfPageCpc?(): number
    remove?(): void
    setAdParam?(index: number, insertionText: string): void
    urls?(): KeywordUrls
}

interface KeywordBidding extends AdWordsBidding, canSetBiddingStrategy {
    clearStrategy?(): void
    getCpc?(): number
    getCpm?(): number
    setCpc?(cpc: number): void
    setCpm?(cpm: number): void
}

interface KeywordBuilder<Keyword> extends AdWordsBuilder<Keyword>,
                                          hasBiddingStrategyBuilder<KeywordBuilder<Keyword>>,
                                          hasTrackingTemplateBuilder<KeywordBuilder<Keyword>>,
                                          hasFinalUrlBuilder<KeywordBuilder<Keyword>> {
    withCpc?(cpc: number): KeywordBuilder<Keyword>
    withCpm?(cpm: number): KeywordBuilder<Keyword>
    withText?(text: string): KeywordBuilder<Keyword>
}

interface KeywordUrls extends AdWordsUrls, hasGetFinalUrl, hasSetTrackingTemplate, hasSetFinalUrl {
    clearFinalUrl?(): void
    clearMobileFinalUrl?(): void
    clearTrackingTemplate?(): void
}

// Labels
interface Label extends AdWordsEntity {
    adGroups?(): AdWordsSelector<AdGroup>
    ads?(): AdWordsSelector<Ad>
    campaigns?(): AdWordsSelector<Campaign>
    getColor?(): string
    getDescription?(): string
    getId?(): string
    getName?(): string
    keywords?(): AdWordsSelector<Keyword>
    remove?(): void
    setColor?(color: string): void
    setDescription?(description: string): void
    setName?(name: string): void
}

// Media
interface AdMedia {
    media?(): AdWordsSelector<Media>
    newImageBuilder?(): ImageBuilder<Media>
    newMediaBundleBuilder?(): AdWordsBuilder<AdWordsEntity> // TODO: MediaBundleBuilder
    newVideoBuilder?(): AdWordsBuilder<AdWordsEntity> // TODO: VideoBuilder
}

interface Dimensions {
    getHeight?(): number
    getWidth?(): number
}

interface ImageBuilder<Media> extends AdWordsBuilder<Media> {
    withData?(data: GoogleAppsScript.Base.Blob): ImageBuilder<Media>
    withName?(name: string): ImageBuilder<Media>
}

interface Media {
    getDimensions?(): MediaDimensions
    getFileSize?(): number
    getId?(): number
    getMimeType?(): string
    getName?(): string
    getReferenceId?(): string
    getSourceUrl?(): string
    getType?(): MediaType
    getUrls?(): MediaUrls
    getYouTubeVideoId?(): string | void
}

interface MediaBundleBuilder<Media> extends AdWordsBuilder<Media> {
    withData?(data: GoogleAppsScript.Base.Blob): MediaBundleBuilder<Media>
    withName?(name: string): MediaBundleBuilder<Media>
}

interface MediaDimensions {
    getFullMediaDimensions(): Dimensions
    getPreviewMediaDimensions(): Dimensions
    getShrunkenMediaDimensions(): Dimensions
    getVideoThumbnailDimensions(): Dimensions
}

interface MediaUrls {
    getFullMediaUrl(): string
    getPreviewMediaUrl(): string
    getShrunkenMediaUrl(): string
    getVideoThumbnailMediaUrl(): string
}

interface VideoBuilder<Media> extends AdWordsBuilder<Media> {
    withYouTubeVideoId?(youTubeVideoId: string): VideoBuilder<Media>
}

// Negative Keywords
interface NegativeKeyword extends AdWordsEntity, isAdGroupChild {
    getMatchType?(): MatchType
    getText?(): string
    remove?(): void
}

// Reports
interface AdWordsReport {
    exportToSheet?(sheet: GoogleAppsScript.Spreadsheet.Sheet): void
    getColumnHeader?(awqlColumnName: string): AdWordsReportColumnHeader
    rows?(): AdWordsReportRowIterator
}

interface AdWordsReportRow {
    formatForUpload?(): Object
}

interface AdWordsReportRowIterator {
    hasNext?(): boolean
    next?(): AdWordsReportRow
}

interface AdWordsReportColumnHeader {
    getBulkUploadColumnName?(): string
    getReportColumnName?(): string
}

// Shared Sets
interface ExcludedPlacementList extends AdWordsEntity {
    addExcludedPlacement(url: string): void
    addExcludedPlacements(urls: Array<string>): void
    campaigns(): AdWordsSelector<Campaign>
    excludedPlacements(): AdWordsSelector<SharedExcludedPlacement>
    getId?(): number
    getName?(): string
    setName?(name: string): void
}

interface ExcludedPlacementListBuilder<ExcludedPlacementList> extends AdWordsBuilder<ExcludedPlacementList> {
    withName?(name: string): ExcludedPlacementListBuilder<ExcludedPlacementList>
}

interface SharedExcludedPlacement extends AdWordsEntity {
    getExcludedPlacementList?(): ExcludedPlacementList
    getUrl?(): string
    remove?(): void
}

interface NegativeKeywordList extends AdWordsEntity {
    addNegativeKeyword?(keywordText: string): void
    addNegativeKeywords?(keywordTexts: Array<string>)
    campaigns?(): AdWordsSelector<Campaign>
    getId?(): number
    getName?(): string
    negativeKeywords?(): AdWordsSelector<SharedNegativeKeyword>
    setName?(): string
}

interface NegativeKeywordListBuilder<NegativeKeywordList> extends AdWordsBuilder<NegativeKeywordList> {
    withName?(name: string): NegativeKeywordListBuilder<NegativeKeywordList>
}

interface SharedNegativeKeyword extends AdWordsEntity {
    getMatchType?(): MatchType
    getNegativeKeywordList?(): NegativeKeywordList
    getText?(): string
    remove?(): void
}

// Shopping

// Targeting


// User Lists

// Video

// Non-entity
interface ExtensionSchedule {
    getDayOfWeek?(): DayOfWeekString
    getEndHour?(): number
    getEndMinute?(): number
    getStartHour?(): number
    getStartMinute?(): number
}

interface ExtensionScheduleInput {
    dayOfWeek?: DayOfWeekString
    startHour?: number
    startMinute?: number
    endHour?: number
    endMinute?: number
}

interface LocationObject {
    id: number
    bidModifier?: number
}

interface ProximityObject {
    latitude: number
    longitude: number
    radius: number
    radiusUnits: RadiusUnits
    bidModifier?: number
    address?: AddressObject
}

interface AddressObject {
    streetAddress: string
    streetAddress2: string
    cityName: string
    provinceName: string
    provinceCode: string
    postalCode: string
    countryCode: string
}

// Extendables
interface canBeEnabled {
    enable?(): void
    isEnabled?(): boolean
    isPaused?(): boolean
    pause?(): void
}

interface canSetBiddingStrategy {
    setStrategy?(biddingStrategy: BiddingStrategy): void
    setStrategy?(biddingStrategy: BiddingStrategyString): void
}

interface hasBiddingStrategyBuilder<B> {
    withBiddingStrategy?(biddingStrategy: BiddingStrategyString): B
    withBiddingStrategy?(biddingStrategy: BiddingStrategy): B
}

interface hasExtensions {
    addCallout?(calloutExtension: Callout): AdWordsOperation<Callout>
    addMessage?(messageExtension: Message): AdWordsOperation<Message>
    addMobileApp?(mobileAppExtension: MobileApp): AdWordsOperation<MobileApp>
    addPhoneNumber?(phoneNumberExtension: PhoneNumber): AdWordsOperation<PhoneNumber>
    addReview?(reviewExtension: Review): AdWordsOperation<Review>
    addSitelink?(sitelinkExtension: Sitelink): AdWordsOperation<Sitelink>
    addSnippet?(snippetExtension: Snippet): AdWordsOperation<Snippet>
    removeCallout?(calloutExtension: Callout): void
    removeMessage?(messageExtension: Message): void
    removeMobileApp?(mobileAppExtension: MobileApp): void
    removePhoneNumber?(phoneNumberExtension: PhoneNumber): void
    removeReview?(reviewExtension: Review): void
    removeSitelink?(sitelinkExtension: Sitelink): void
    removeSnippet?(snippetExtension: Snippet): void
}

interface hasGetFinalUrl {
    getFinalUrl?(): string
    getMobileFinalUrl?(): string
}
interface hasSetFinalUrl {
    setFinalUrl?(url: string): void
    setMobileFinalUrl?(url: string): void
}
interface hasFinalUrlBuilder<B> {
    withFinalUrl(url: string): B
    withMobileFinalUrl(url: string): B
}

interface hasLabels {
    applyLabel?(name: string): void
    labels?(): AdWordsSelector<Label>
    removeLabel?(name: string): void
}

interface hasMobilePreferred {
    isMobilePreferred?(): boolean
    setMobilePreferred?(isMobilePreferred: boolean): void
}
interface hasMobilePreferredBuilder<B> {
    withMobilePreferred?(): B
}

interface hasSchedules {
    getSchedules?(): ExtensionSchedule
    setSchedules?(schedules: ExtensionScheduleInput): void
}
interface hasSchedulesBuilder<B> {
    withSchedules?(schedules: ExtensionScheduleInput): B
}

interface hasSetTrackingTemplate {
    setCustomParameters?(customParameters: Object): void
    setTrackingTemplate?(trackingTemplate: string): void
}
interface hasTrackingTemplateBuilder<B> {
    withCustomParameters?(customParameters: Object): B
    withTrackingTemplate?(trackingTemplate: string): B
}

interface hasStartAndEndDate {
    getEndDate?(): AdWordsDate
    getStartDate?(): AdWordsDate
    setEndDate?(date: AdWordsDate | string): void
    setStartDate?(date: AdWordsDate | string)
}
interface hasStartAndEndDateBuilder<B> {
    withEndDate?(date: AdWordsDate | string): B
    withStartDate?(date: AdWordsDate | string): B
}

interface hasStats {
    getStatsFor?(dateRange: DayOfWeekString): AdWordsStats
    getStatsFor?(dateFrom: AdWordsDate | string, dateTo: AdWordsDate | string): AdWordsStats
}

interface isCampaignChild {
    getCampaign?(): Campaign
}
interface isAdGroupChild extends isCampaignChild {
    getAdGroup?(): AdGroup
}

// Types
declare type AdWordsDate = {
    year: number
    month: number
    day: number
}

declare type DayOfWeekString = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

declare type AppStore = 'iOS' | 'Android'

declare type ApprovalStatus = 'APPROVED' | 'DISAPPROVED' | 'FAMILY_SAFE' | 'NON_FAMILY_SAFE' | 'PORN' | 'UNCHECKED'

declare type PolicyApprovalStatus = 'UNKNOWN' | 'APPROVED' | 'APPROVED_LIMITED' | 'ELIGIBLE' | 'UNDER_REVIEW' | 'DISAPPROVED' | 'SITE_SUSPENDED'

declare type AdType = 'EXPANDED_TEXT_AD' | 'IMAGE_AD' | 'MOBILE_AD' | 'MOBILE_IMAGE_AD' | 'PRODUCT_AD' | 'RICH_MEDIA_AD' | 'TEMPLATE_AD' | 'TEXT_AD'

declare type BiddingStrategySource = 'CAMPAIGN' | 'ADGROUP' | 'CRITERION'

declare type TargetingSetting = 'TARGET_ALL_TRUE' | 'TARGET_ALL_FALSE'

declare type AudienceType = 'USER_INTEREST' | 'USER_LIST'

declare type RadiusUnits = 'MILES' | 'KILOMETERS'

declare type AdRotationType = 'OPTIMIZE' | 'CONVERSION_OPTIMIZE' | 'ROTATE' | 'ROTATE_FOREVER'

declare type BiddingStrategyString = 'MANUAL_CPC' | 'MANUAL_CPM' | 'BUDGET_OPTIMIZER' | 'CONVERSION_OPTIMIZER' | 'PERCENT_CPA'

declare type CriterionTypeGroup = 'USER_INTEREST_AND_LIST'

declare type MatchType = 'BROAD' | 'PHRASE' | 'EXACT'

declare type MediaType = 'AUDIO' | 'DYNAMIC_IMAGE' | 'ICON' | 'IMAGE' | 'STANDARD_ICON' | 'VIDEO' | 'MEDIA_BUNDLE'

// Autocomplete
declare namespace AdWordsApp {
    function adCustomizerSources(): AdWordsSelector<AdCustomizerSource>
    function adGroups(): AdWordsSelector<AdGroup>
    function adMedia(): AdMedia
    function adParams(): AdWordsSelector<AdParam>
    function ads(): AdWordsSelector<Ad>
    function biddingStrategies(): AdWordsSelector<BiddingStrategy>
    function budgetOrders(): AdWordsBasicSelector<BudgetOrder>
    function budgets(): AdWordsSelector<Budget>
    function bulkUploads(): BulkUploads
    function campaigns(): AdWordsSelector<Campaign>
    function currentAccount(): CurrentAccount
    function display(): Display
    function excludedPlacementLists(): AdWordsSelector<ExcludedPlacementList>
    function extensions(): AdWordsAdExtensions
    function getExecutionInfo(): ExecutionInfo
    function keywords(): AdWordsSelector<Keyword>
    function labels(): AdWordsSelector<Label>
    function negativeKeywordLists(): AdWordsSelector<NegativeKeywordList>
    function newExcludedPlacementListBuilder(): ExcludedPlacementListBuilder<ExcludedPlacementList>
    function newNegativeKeywordListBuilder(): NegativeKeywordListBuilder<NegativeKeywordList>
    function report(query: string, options?: Object): AdWordsReport
}

declare namespace MccApp {

}

// @gaws specific
interface GawsIteratorInput {
    entity: AdWordsSelector<AdWordsEntity>
    conditions?: Array<string>
    dateRange?: string
    order?: Array<string>
    ids?: Array<number>
    limit?: number | undefined
}

interface GawsReportInput {
    select: Array<string> | string
    from: string
    where?: Array<string> | string
    during?: Array<string> | string
    options?: Object
}

interface GawsCoreSharedMethods {
    arg: AdWordsSelector<AdWordsEntity> | AdWordsReport
    length: number
    every(cb: Function): boolean
    filter(cb: Function): Array<AdWordsEntity | AdWordsReportRow>
    find(cb: Function): AdWordsEntity | AdWordsReportRow
    findIndex(cb: Function): (Number | undefined)
    forEach(cb: Function): void
    map<T>(cb: Function): Array<T>
    reduce<A>(cb: Function, iv: A): A
    slice(b: number, e: number): Array<AdWordsEntity | AdWordsReportRow>
    some(cb: Function): boolean
}

interface GawsComponent {
    render?(): string
}

interface GawsComponentInput {
    tag: string
    props: Object
    content?: string | GawsComponent
}

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "*.css" {
    const content: string;
    export default content;
}

declare module "*.scss" {
    const content: string;
    export default content;
}