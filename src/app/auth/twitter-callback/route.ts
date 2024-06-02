export async function GET() {
	return new Response(
		`<head>
			<script>
				(${redirectFunction})();
			</script>
		</head>`,
		{
			headers: { 'Content-Type': 'text/html' }
		}
	);
}

function redirectFunction() {
	const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
	
	opener.postMessage({
		type: 'twitter-auth-result',
		data: params
	});
}