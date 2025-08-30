import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface AdvertisementProps {
  adSlot?: string;
  adClient?: string;
  adFormat?: string;
  responsive?: boolean;
}

const Advertisement = ({ 
  adSlot = "1234567890",
  adClient = "ca-pub-6671588871176014",
  adFormat = "auto",
  responsive = true 
}: AdvertisementProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google AdSense 스크립트가 로드되었는지 확인하고 지연 후 실행
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense error:', error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cx('adWrapper')}>
      <div className={cx('adContainer')}>
        {/* Google AdSense 광고 */}
        <ins 
          className={cx('adBanner', 'adsbygoogle')}
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          ref={adRef}
        />
      </div>
    </div>
  );
};

export default Advertisement;