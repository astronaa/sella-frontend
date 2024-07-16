'use client';

import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { WEBSOCKET_BASE_URL } from "~/shared/config/websocket-base-url";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";

interface UseSocketIoArgs {
	uri?: string,
	accessToken?: string,
}

interface UseSocketIoEventsArgs {
	onConnect?: (socket: Socket) => void,
	onDisconnect?: (socket: Socket) => void,
	onCreated?: (socket: Socket) => void,
	onDestroyed?: (socket: Socket) => void,
}

export function useSocketIo({ uri = WEBSOCKET_BASE_URL, accessToken }: UseSocketIoArgs) {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (!accessToken)
			return;

		const socket = io(uri, {
			transports: ['websocket'],
			auth: { accessToken }
		});

		setSocket(socket);

		return () => {
			socket.close();
		}
	}, [uri, accessToken]);

	return socket
}

export function useSocketIoEvents(socket: Socket | null, args: UseSocketIoEventsArgs) {
	const onConnect = useCallbackRef(args.onConnect);
	const onDisconnect = useCallbackRef(args.onDisconnect);
	const onCreated = useCallbackRef(args.onCreated);
	const onDestroyed = useCallbackRef(args.onDestroyed);

	useEffect(() => {
		if (!socket)
			return;

		const onConnectHandler = () => onConnect(socket);
		const onDisconnectHandler = () => onDisconnect(socket);

		socket.on('connect', onConnectHandler);
		socket.on('disconnect', onDisconnectHandler);

		onCreated(socket);

		return () => {
			socket.off('connect', onConnectHandler);
			socket.off('disconnect', onDisconnectHandler);

			onDestroyed(socket);
		}
	}, [socket, onConnect, onDisconnect, onCreated, onDestroyed]);
}