export default interface CardInfo  {
    cardID: string;
    cardTitle: string;
    cardDescription: string;
    cardCreatedAt: Date;
    commentID?: string; // Optional, since the card might not have comments
    commentText?: string; // Optional
    commentUserID?: string; // Optional
    commentUsername?: string; // Optional
    commentCreatedAt?: Date; // Optional
};
