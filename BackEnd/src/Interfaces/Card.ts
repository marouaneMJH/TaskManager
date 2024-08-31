interface Card {
    cardID: number;
    cardTitle: string;
    cardDescription?: string;
    listID?: number;
    createdAt?: Date;
}

export default Card;

