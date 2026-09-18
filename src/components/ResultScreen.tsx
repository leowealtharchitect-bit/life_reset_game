import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameState } from '../types';
import { DEFENSE_PILLARS } from '../data';
import { LeoAvatar } from './LeoAvatar';
import { StressCalculator } from './StressCalculator';

interface ResultScreenProps {
  gameState: GameState;
  onRestartGame: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  gameState,
  onRestartGame,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const isSuccess = gameState.savings > 100000 && gameState.health > 50;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 py-2 animate-fade-in">
      {/* Top Settlement Card */}
      <div className="glass-card rounded-3xl p-6 text-center space-y-4 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow">
          LEO 专家研盘终局复盘
        </div>

        <span className="px-4 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black rounded-full border border-amber-500/20">
          30 岁 ~ 60 岁 人生重置模拟终局
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {isSuccess
            ? '🎉 恭喜！你成功构建了稳健的大马家庭防线！'
            : '⚠️ 警示！你在退休前夕面临财务与健康双重危机！'}
        </h2>

        {gameState.character && (
          <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {gameState.character.avatarImage && (
              <img
                src={gameState.character.avatarImage}
                alt={gameState.character.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-lg object-cover border border-amber-400"
              />
            )}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              玩家角色：{gameState.character.name}（{gameState.character.title}）
            </span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-2xl mx-auto text-xs font-bold">
          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-normal block text-[10px]">60岁最终退休资产</span>
            <span
              className={`text-base font-black ${
                gameState.savings < 0 ? 'text-rose-500' : 'text-emerald-500'
              }`}
            >
              RM {gameState.savings.toLocaleString()}
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-normal block text-[10px]">健康体魄评分</span>
            <span
              className={`text-base font-black ${
                gameState.health < 60 ? 'text-rose-500' : 'text-sky-500'
              }`}
            >
              {gameState.health} / 100
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-normal block text-[10px]">化解重疾危机次数</span>
            <span className="text-base font-black text-amber-500">
              {gameState.totalCrisesHandled} 次
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-normal block text-[10px]">成功获得重疾现金理赔</span>
            <span className="text-base font-black text-amber-400">
              RM {gameState.totalInsuranceClaims.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Leo Advisor CTA Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border-2 border-amber-400/50 space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-4">
            <LeoAvatar avatarUrl={gameState.avatarUrl} sizeClass="w-16 h-16" textClass="text-2xl" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-amber-400">LEO 家庭财富传承规划师</h3>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                  Wealth Advisor
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                “用心守护 · 传承每一个家 | 规划现在 · 守护未来”
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/60164311419?text=Hi%20LEO,%20我体验了你的《人生重置计划》30-60岁大马家庭策略游戏，想向你咨询如何搭建我的家庭防线与重疾对冲规划。"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/20 transition transform hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>WhatsApp 立即联系 LEO (+6016-431 1419)</span>
          </a>
        </div>

        {/* 5 Core Pillars */}
        <div>
          <p className="text-xs text-amber-300 font-bold mb-3">
            🛡️ LEO 大马家庭防线五大守护核心：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-center text-xs">
            {DEFENSE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition"
              >
                <i className={`fa-solid ${pillar.icon} ${pillar.color} text-lg mb-1 block`}></i>
                <span className="font-bold text-slate-200">{pillar.title}</span>
                <p className="text-[9px] text-slate-400 mt-1">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stress Calculator */}
      <StressCalculator />

      {/* Restart Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onRestartGame}
          className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-amber-500 hover:bg-amber-600 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          <i className="fa-solid fa-rotate-right"></i>
          <span>重新以其他角色体验模拟</span>
        </button>
      </div>
    </div>
  );
};
