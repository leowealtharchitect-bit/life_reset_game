import React from 'react';
import { Character } from '../types';
import { CHARACTERS } from '../data';
import { LeoAvatar } from './LeoAvatar';

interface StartScreenProps {
  avatarUrl: string;
  onSelectCharacter: (character: Character) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  avatarUrl,
  onSelectCharacter,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full py-2 text-center space-y-6 animate-fade-in">
      {/* Top Leo Advisor Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border-2 border-amber-400/40 w-full flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center space-x-4 text-left z-10">
          <LeoAvatar avatarUrl={avatarUrl} sizeClass="w-16 h-16" textClass="text-2xl" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base text-amber-400">
                LEO 家庭财富传承规划师
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                Wealth Advisor
              </span>
            </div>
            <p className="text-xs text-slate-300 italic font-medium mt-1">
              “用心守护 · 传承每一个家”
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end text-xs text-amber-300/90 font-medium z-10 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 gap-2">
          <div className="text-right">
            <div className="font-bold text-sm text-white">规划现在 · 守护未来</div>
            <div className="text-[10px] text-slate-400 mt-0.5">大马家庭防线策略模拟演练</div>
          </div>
          <a
            href="https://wa.me/60164311419?text=Hi%20LEO,%20我在你的《人生重置计划》模拟器看到你的专业规划，想向你咨询大马家庭防线与重疾对冲策略。"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[11px] shadow-md transition transform hover:scale-105"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp 咨询 LEO</span>
          </a>
        </div>
      </div>

      {/* Game Title & Intro */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-500/30">
          <i className="fa-solid fa-gamepad animate-bounce"></i>
          <span>互动策略游戏：模拟大马家庭 30 岁至 60 岁黄金30年</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          如果你能重新规划 <span className="gold-gradient-text">30岁到60岁</span> 的财务与健康
          <br />
          能否化解突如其来的重大疾病与收入中断风暴？
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          大马人普遍存在误区：以为有 Medical Card 医保卡就够了。然而当重大疾病（心脏病、癌症、中风）降临时，真正的危机是{' '}
          <strong className="text-amber-600 dark:text-amber-400">
            3~5 年不能工作的收入中断与家庭供养危机
          </strong>
          ！
        </p>
      </div>

      {/* 5 Pillars Quick Row */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 p-3 bg-slate-200/70 dark:bg-slate-900/70 rounded-2xl border border-slate-300 dark:border-slate-800 text-xs font-bold">
        <div className="flex flex-col items-center p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <i className="fa-solid fa-notes-medical text-sky-500 text-lg mb-1"></i>
          <span className="text-slate-800 dark:text-slate-200">1. 医疗保障</span>
          <span className="text-[9px] text-slate-400 font-normal">守护健康</span>
        </div>
        <div className="flex flex-col items-center p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <i className="fa-solid fa-shield-halved text-amber-500 text-lg mb-1"></i>
          <span className="text-slate-800 dark:text-slate-200">2. 保险规划</span>
          <span className="text-[9px] text-slate-400 font-normal">守护家人</span>
        </div>
        <div className="flex flex-col items-center p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <i className="fa-solid fa-handshake text-indigo-500 text-lg mb-1"></i>
          <span className="text-slate-800 dark:text-slate-200">3. 信托规划</span>
          <span className="text-[9px] text-slate-400 font-normal">守护资产</span>
        </div>
        <div className="flex flex-col items-center p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <i className="fa-solid fa-file-signature text-rose-500 text-lg mb-1"></i>
          <span className="text-slate-800 dark:text-slate-200">4. 遗嘱规划</span>
          <span className="text-[9px] text-slate-400 font-normal">守护意愿</span>
        </div>
        <div className="flex flex-col items-center p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 col-span-2 sm:col-span-1">
          <i className="fa-solid fa-house-chimney-window text-emerald-500 text-lg mb-1"></i>
          <span className="text-slate-800 dark:text-slate-200">5. 财富传承</span>
          <span className="text-[9px] text-slate-400 font-normal">富过三代</span>
        </div>
      </div>

      {/* Character Cards */}
      <div className="w-full text-left">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
          <i className="fa-solid fa-users text-amber-500"></i>
          <span>请选择你的模拟人生起点角色：</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className="glass-card p-5 rounded-3xl cursor-pointer hover:border-amber-400 dark:hover:border-amber-400 transition transform hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {char.avatarImage ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-amber-400/50 flex-shrink-0 bg-slate-800">
                      <img
                        src={char.avatarImage}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${char.avatarBg} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition duration-300`}
                    >
                      <i className={`fa-solid ${char.icon}`}></i>
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base">
                      {char.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      {char.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[38px]">
                  {char.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">初始流动储蓄：</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      RM {char.initialSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">月薪 / 月开销：</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      RM {char.monthlyIncome.toLocaleString()} / RM {char.monthlyExpense.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">初始健康体魄：</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">
                      {char.initialHealth} / 100
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-slate-950 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition duration-300 shadow-sm cursor-pointer">
                选择此角色启程
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
