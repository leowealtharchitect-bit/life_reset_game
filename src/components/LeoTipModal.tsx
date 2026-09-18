import React from 'react';
import { LeoAvatar } from './LeoAvatar';

interface LeoTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
  content: string;
}

export const LeoTipModal: React.FC<LeoTipModalProps> = ({
  isOpen,
  onClose,
  avatarUrl,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 border-2 border-amber-500/40 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 cursor-pointer"
          aria-label="关闭"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <LeoAvatar avatarUrl={avatarUrl} sizeClass="w-12 h-12" textClass="text-xl" />
          <div>
            <h3 className="text-amber-400 font-bold text-base">LEO 规划师的风险防线解析</h3>
            <p className="text-xs text-slate-400">大马家庭财富与健康防线洞察</p>
          </div>
        </div>

        <div
          className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <a
            href="https://wa.me/60164311419?text=Hi%20LEO,%20我在模拟器看到你的家庭防线风险解析，想针对我的具体情况咨询防线策略。"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md transition"
          >
            <i className="fa-brands fa-whatsapp text-base"></i>
            <span>WhatsApp 深入探讨防线 (+6016-431 1419)</span>
          </a>
          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            继续重置人生
          </button>
        </div>
      </div>
    </div>
  );
};
