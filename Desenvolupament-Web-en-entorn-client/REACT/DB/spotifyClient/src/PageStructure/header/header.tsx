type HeaderProps = {
    userName: string;
    date: string;
    onRefreshDate: () => void;
};

const Header = ({
    userName,
    date,
    onRefreshDate
}: HeaderProps) => (
    <header>
        <h1>Spotify</h1>
        <p>Usuari: {userName}</p>
        <p>Data i hora: {date}</p>
        <button type="button" onClick={onRefreshDate}>
            Actualitza la data
        </button>
    
    </header>
);

export default Header;