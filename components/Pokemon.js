import styles from '../styles/Pokemon.module.css';

function Pokemon(props) {
	const styleColors = {
		style1: '#DCDAD3',
		style2: '#F376B5',
		style3: '#E7341B',
		style4: '#49D6F3',
		style5: '#9162F0',
		style6: '#F1C40F',
		style7: '#97D345',
	};

	const glowColor = styleColors[props.style] || '#ffffff';

	const cssVars = {
		'--glow-color': glowColor
	};

	return (
		<div className={styles.pokemon} style={cssVars}>
			<div className={styles.imgContainer}>
				<img src={props.image} alt={props.name} />
			</div>
			<div className={styles.info}>
				<h3 className={styles.name}>{props.name}</h3>
				<span className={styles.type}>Type: <span>{props.type}</span></span>
			</div>
		</div>
	);
}

export default Pokemon;