export interface Type {
    type: 'bookwidget' | 'textChallenge' | 'Quiz' | 'HANGMAN' | null;
}
export default interface ActivityType extends Type {
    key: 'activity';
    value: any;
}
