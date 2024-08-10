export default  interface Comment {
    commentID: number;
    commentText?: string;
    userID?: number;
    cardID?: number;
    createdAt?: Date;
}