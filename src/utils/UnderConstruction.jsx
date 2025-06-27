
const UnderConstruction = () => {

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundColor: '#f8f9fa',
        },
        heading: {
            fontSize: '2.5rem',
            marginBottom: '1rem',
        },
        text: {
            fontSize: '1rem',
            color: '#6c757d',
        },
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🚧 Under Construction 🚧</h1>
            <p style={styles.text}>We&apos;re working hard to bring you something amazing. Stay tuned!</p>
        </div>
    )
}

export default UnderConstruction