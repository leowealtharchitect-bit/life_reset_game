import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-1 text-left">
          <p className="flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-amber-500"></i>
            <span>
              本游戏由{' '}
              <strong className="text-slate-700 dark:text-slate-200">
                LEO 家庭财富传承规划师
              </strong>{' '}
              专属研发，旨在普及大马家庭风险防护与健康对冲规划。
            </span>
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            © 2026 LEO 家庭财富传承规划师. 保留所有权利。
          </p>
        </div>
        <div className="flex items-center gap-3 self-center sm:self-auto">
          <a
            href="https://wa.me/60164311419?text=Hi%20LEO,%20我体验了你的《人生重置计划》模拟器，想向你咨询大马家庭防线配置。"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 dark:text-amber-500 font-bold hover:underline flex items-center gap-1.5 whitespace-nowrap"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp: +6016-431 1419</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
