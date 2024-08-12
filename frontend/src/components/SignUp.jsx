export default function Signup() {
	return (
		<div>
			<h1>Sign Up</h1>
			<form>
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" name="username" />
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" />
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}
