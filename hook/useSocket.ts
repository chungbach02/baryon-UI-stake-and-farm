import { SOCKET_EVENTS } from '@/constants/socket';
import { useGlobalStore } from '@/stores/global.store';
import { IGeckoTokenModel } from '@/types/token.model';
import size from 'lodash/size';
import { useCallback } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const { socketClient, setSocketClient } = useGlobalStore();

  const connect = () => {
    if (socketClient) {
      return;
    }
    activeSocketInfo();
  };

  const disconnect = () => {
    socketClient?.disconnect();
    setSocketClient(undefined);
  };

  const activeSocketInfo = () => {
    try {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT, {
        transports: ['websocket'],
      });

      socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('Socket info connected');
        setSocketClient(socket);
      });

      socket.on(SOCKET_EVENTS.DISCONNECT, activeSocketInfo);
    } catch (error) {
      console.log('Socket info error:', error);
      activeSocketInfo();
    }
  };

  const getGeckoToken = useCallback(
    (id: string) => {
      if (!socketClient) {
        return;
      }

      return new Promise<IGeckoTokenModel | undefined>((resolve) => {
        if (size(id) === 0) {
          return resolve(undefined);
        }

        setTimeout(() => {
          resolve(undefined);
        }, 4000);

        socketClient.emit(
          SOCKET_EVENTS.MARKET_INFO,
          id,
          (data: IGeckoTokenModel) => {
            return resolve(data);
          },
        );
      });
    },
    [socketClient],
  );

  return {
    connect,
    getGeckoToken,
    disconnect,
  };
};

export default useSocket;
