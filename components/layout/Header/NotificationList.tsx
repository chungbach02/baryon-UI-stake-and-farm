'use client';

import EmptyState from '@/components/ui/EmptyState';
import { DEFAULT_PAGINATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useFilterParams } from '@/hook/useFilterParams';
import { mapNotificationType } from '@/mapper/notification.mapper';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import {
  IBaseResponse,
  IPaginationRequest,
  IPaginationResponse,
} from '@/types/base.model';
import { INotificationModel } from '@/types/common.model';
import { Icon, Skeleton } from '@ne/uikit-dex';
import { useInfiniteQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

const NotificationList = () => {
  const t = useTranslations();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { baryonApiService } = useBaryonServices();
  const { params } = useFilterParams<IPaginationRequest>({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
  });
  baryonApiService.postLiquidityHash
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION, params],
    queryFn: ({ pageParam }) =>
      baryonApiService.adapters.get<
        IBaseResponse<IPaginationResponse<INotificationModel>>
      >(ENDPOINTS.NOTIFICATION_ADDRESS, {
        params: { ...params, page: pageParam },
      }),
    getNextPageParam: (lastPage) =>
      get(lastPage, 'data.currentPage') < get(lastPage, 'data.total')
        ? lastPage.data.currentPage + 1
        : undefined,
    initialPageParam: DEFAULT_PAGINATION.PAGE_NUMBER,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '20px',
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return get(data, 'pages[0].data.total', 0) > 0 ? (
    <ul className="flex flex-col gap-6">
      {get(data, 'pages', []).map((page) =>
        get(page, 'data.data', []).map((notif) => (
          <li key={notif._id}>
            <div className="flex items-start gap-2">
              <Icon
                size="xl"
                iconName="saros_logo"
                className="mt-2 text-brand-primary dark:text-txt-primary"
              />
              <div className="w-full overflow-hidden">
                <div className="flex-between">
                  <h5 className="text-brand-primary capitalize">
                    {t(mapNotificationType(notif.type))}
                  </h5>
                  <span className="text-sm">
                    {moment(notif.createdAt).fromNow()}
                  </span>
                </div>
                <div className="text-sm text-ellipsis text-wrap overflow-hidden first-letter:uppercase line-clamp-2">
                  {notif.message}
                </div>
              </div>
            </div>
          </li>
        )),
      )}
      <div ref={loadMoreRef} />
    </ul>
  ) : (
    <div className="h-full w-full items-center justify-center">
      {isFetching ? (
        <ul className="flex flex-col gap-4">
          {Array(3)
            .fill(3)
            .map((_, idx) => (
              <li key={idx}>
                <div className="flex items-start gap-2">
                  <Skeleton circle width={24} height={24} />
                  <div className="w-full overflow-hidden">
                    <div className="flex-between">
                      <Skeleton width={60} />
                      <Skeleton width={40} />
                    </div>
                    <Skeleton className="w-full" height={40} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <EmptyState className="h-[20rem]" />
      )}
    </div>
  );
};

export default NotificationList;
