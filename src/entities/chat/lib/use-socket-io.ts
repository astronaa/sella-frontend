'use client';

import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { WEBSOCKET_BASE_URL } from "~/shared/config/websocket-base-url";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";

interface UseSocketIoArgs {
	uri?: string,
	accessToken?: string,
	onConnect?: (socket: Socket) => void,
	onDisconnect?: (socket: Socket) => void,
	onCreated?: (socket: Socket) => void,
	onDestroyed?: (socket: Socket) => void,
}

export function useSocketIo({ uri = WEBSOCKET_BASE_URL, accessToken, ...args }: UseSocketIoArgs) {
	const socketRef = useRef<Socket>();

	const onConnect = useCallbackRef(args.onConnect);
	const onDisconnect = useCallbackRef(args.onDisconnect);
	const onCreated = useCallbackRef(args.onCreated);
	const onDestroyed = useCallbackRef(args.onDestroyed);

	useEffect(() => {
		if (!accessToken)
			return;

		const socket = io(uri, {
			transports: ['websocket'],
			auth: { accessToken }
		});

		const onConnectHandler = () => onConnect(socket);
		const onDisconnectHandler = () => onDisconnect(socket);

		socket.on('connect', onConnectHandler);
		socket.on('disconnect', onDisconnectHandler);

		socketRef.current = socket;

		onCreated(socket);

		return () => {
			socket.off('connect', onConnectHandler);
			socket.off('disconnect', onDisconnectHandler);
			socket.close();

			onDestroyed(socket);

			socketRef.current = undefined;
		}
	}, [socketRef, onConnect, onDisconnect, onCreated, onDestroyed, uri, accessToken]);

	return {
		socketRef
	}
}