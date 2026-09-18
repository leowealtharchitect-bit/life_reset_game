import React, { useState, useEffect } from 'react';
import { GameState, Character, ShieldLevel } from './types';
import { STAGES, CRISES } from './data';
import { playAudio } from './utils/audio';
import { LeoAvatar } from './components/LeoAvatar';
import { LeoTipModal } from './components/LeoTipModal';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { ResultScreen } from './components/ResultScreen';
import { Footer } from './components/Footer';

export function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [tipModalOpen, setTipModalOpen] = useState<boolean>(false);
  const [tipContent, setTipContent] = useState<string>('');

  const [avatarUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('leo_custom_avatar') || '/leo_photo.jpg';
    } catch {
      return '/leo_photo.jpg';
    }
  });

  const [gameState, setGameState] = useState<GameState>(() => ({
    screen: 'start',
    character: null,
    currentStageIdx: 0,
    health: 100,
    savings: 0,
    shieldLevel: 'NONE',
    historyLogs: [],
    totalCrisesHandled: 0,
    totalInsuranceClaims: 0,
    incomeLossPrevented: 0,
    avatarUrl: '/leo_photo.jpg',
  }));

  useEffect(() => {
    setGameState((prev) => ({ ...prev, avatarUrl }));
    // Auto sync uploaded photo to disk if exists in localStorage
    if (avatarUrl && avatarUrl.startsWith('data:image')) {
      fetch('/api/persist-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: avatarUrl }),
      }).catch((err) => console.warn('Avatar persist sync:', err));
    }
  }, [avatarUrl]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSelectCharacter = (char: Character) => {
    playAudio('success', soundEnabled);
    setGameState({
      screen: 'play',
      character: char,
      currentStageIdx: 0,
      health: char.initialHealth,
      savings: char.initialSavings,
      shieldLevel: 'NONE',
      historyLogs: [`30岁：开启人生重置模拟，当前职业为 ${char.name}`],
      totalCrisesHandled: 0,
      totalInsuranceClaims: 0,
      incomeLossPrevented: 0,
      avatarUrl,
    });
  };

  const handleMakeDecision = (decision: ShieldLevel) => {
    playAudio('click', soundEnabled);
    const char = gameState.character;
    if (!char) return;

    const currentStage = STAGES[gameState.currentStageIdx];
    const fiveYearIncome = char.monthlyIncome * 12 * 5;
    const fiveYearExpense = char.monthlyExpense * 12 * 5;

    let insuranceCost = 0;
    if (decision === 'MEDICAL_ONLY') {
      insuranceCost = 12000;
    } else if (decision === 'FULL_SHIELD') {
      insuranceCost = 22800;
    }

    const netPeriodSavings = fiveYearIncome - fiveYearExpense - insuranceCost;
    let newSavings = gameState.savings + netPeriodSavings;
    let newHealth = gameState.health;
    let crisesCount = gameState.totalCrisesHandled;
    let totalClaims = gameState.totalInsuranceClaims;
    let incomePrevented = gameState.incomeLossPrevented;
    const newLogs = [...gameState.historyLogs];

    // Probability of illness crisis (increases with age)
    const crisisChance = 0.35 + gameState.currentStageIdx * 0.08;
    if (Math.random() < crisisChance) {
      crisesCount++;
      const crisis = CRISES[Math.floor(Math.random() * CRISES.length)];
      const incomeLoss = char.monthlyIncome * 12 * crisis.incomeLossYears;

      if (decision === 'NONE') {
        const totalLoss = crisis.medicalCost + incomeLoss;
        newSavings -= totalLoss;
        newHealth -= 25;
        const logMsg = `⚠️ 突发危机！你在 ${currentStage.age} 岁确诊【${crisis.name}】！由于没有任何保险，你支付了 RM ${crisis.medicalCost.toLocaleString()} 医疗费，并因停工 ${crisis.incomeLossYears} 年损失 RM ${incomeLoss.toLocaleString()} 收入！总损失 RM ${totalLoss.toLocaleString()}！`;
        newLogs.push(logMsg);

        setTipContent(`
          <p class="text-rose-400 font-bold">⚠️ 风险真实爆发！</p>
          <p>你在 ${currentStage.age} 岁面临了 <strong class="text-white">${crisis.name}</strong> 的打击。</p>
          <p class="mt-2">因为完全没有配置保险防护，你的家庭存款直接被掏空了 <strong class="text-rose-400">RM ${totalLoss.toLocaleString()}</strong>（包含医疗费与 ${crisis.incomeLossYears} 年收入中断）。</p>
          <p class="mt-2 text-slate-400 text-xs">LEO 提醒：人在健康时总觉得重疾遥远，但在 30-60 岁这一阶段，一次重大疾病就能直接击垮一个原本幸福的大马家庭。</p>
        `);
        setTipModalOpen(true);
        playAudio('warning', soundEnabled);
      } else if (decision === 'MEDICAL_ONLY') {
        newSavings -= incomeLoss;
        newHealth -= 18;
        const logMsg = `🏥 在 ${currentStage.age} 岁确诊【${crisis.name}】！Medical Card 报销了 RM ${crisis.medicalCost.toLocaleString()} 医院账单。但因为无重疾现金理赔，停工 ${crisis.incomeLossYears} 年导致损失 RM ${incomeLoss.toLocaleString()} 家庭生活收入！`;
        newLogs.push(logMsg);

        setTipContent(`
          <p class="text-sky-400 font-bold">🏥 揭示常见误区：Medical Card 的局限</p>
          <p>你的 Medical Card 成功替你向医院支付了 RM ${crisis.medicalCost.toLocaleString()} 的账单。</p>
          <p class="mt-2"><strong class="text-rose-400">但是！</strong> 医疗卡不给一分钱现金。因为需要休养康复 ${crisis.incomeLossYears} 年无法工作，你的家庭被迫承受了 <strong class="text-rose-400">RM ${incomeLoss.toLocaleString()}</strong> 的收入断崖！</p>
          <p class="mt-2 text-slate-300 text-xs">LEO 提醒：这就是为什么只买医疗卡是不够的！重疾险给的是自由支配的现金，用以抵消病后的供房、供车与孩子学费。</p>
        `);
        setTipModalOpen(true);
        playAudio('warning', soundEnabled);
      } else if (decision === 'FULL_SHIELD') {
        const claimPayout = 300000;
        newSavings += claimPayout - incomeLoss;
        newHealth -= 10;
        totalClaims += claimPayout;
        incomePrevented += incomeLoss;
        const logMsg = `🛡️ 完美防御！在 ${currentStage.age} 岁确诊【${crisis.name}】！Medical Card 全额报销医药费，且 LEO 30万重疾防线即时赔付 RM 300,000 现金！不仅弥补了停工损失，还锁定了家庭退休资产！`;
        newLogs.push(logMsg);

        setTipContent(`
          <p class="text-amber-400 font-bold">🎉 LEO 风险防线成功发挥对冲杠杆！</p>
          <p>面临 <strong class="text-white">${crisis.name}</strong> 考验，由于你预先构建了 LEO 完整重疾防线：</p>
          <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-200 text-xs">
            <li>Medical Card 结清全额医院账单。</li>
            <li>一次性获得 <strong class="text-amber-300">RM 300,000 免税现金理赔</strong>。</li>
            <li>完全覆盖了停工 ${crisis.incomeLossYears} 年的 RM ${incomeLoss.toLocaleString()} 收入损失！</li>
          </ul>
          <p class="mt-2 text-emerald-400 text-xs font-bold">结论：你的家庭资产毫发无损，继续稳健奔向 60 岁退休！</p>
        `);
        setTipModalOpen(true);
        playAudio('success', soundEnabled);
      }
    } else {
      const normalMsg = `✅ ${currentStage.age}~${currentStage.age + 5} 岁：事业平稳推进，储蓄新增 RM ${netPeriodSavings.toLocaleString()}。`;
      newLogs.push(normalMsg);
    }

    const nextStageIdx = gameState.currentStageIdx + 1;
    const isGameOver = nextStageIdx >= STAGES.length;

    setGameState((prev) => ({
      ...prev,
      shieldLevel: decision,
      savings: newSavings,
      health: Math.max(0, newHealth),
      totalCrisesHandled: crisesCount,
      totalInsuranceClaims: totalClaims,
      incomeLossPrevented: incomePrevented,
      historyLogs: newLogs,
      currentStageIdx: nextStageIdx,
      screen: isGameOver ? 'result' : 'play',
    }));
  };

  const handleTriggerLeoTip = () => {
    const age = STAGES[gameState.currentStageIdx]?.age || 30;
    let tip = '';
    if (age === 30) {
      tip = '30岁刚买房组建家庭，杠杆最高。此时配置重疾险保费最便宜，每天仅需少喝一杯星巴克，就能锁定 RM 300,000 的高额杠杆。';
    } else if (age === 40) {
      tip = '40岁是身体血管与器官质变的分水岭。大马许多中产阶级在这个年龄段因突发心血管疾病而被迫卖房凑康复费。';
    } else {
      tip = '50岁以后人体的重疾发病率呈指数级上升。提前做好资产隔离与信托遗嘱规划，能确保几十年奋斗的财富安全传承给下一代。';
    }

    setTipContent(`
      <p class="text-amber-400 font-bold mb-2">💡 ${age}岁防线锦囊：</p>
      <p>${tip}</p>
      <p class="mt-3 text-xs text-slate-400">LEO 规划师建议：任何大马家庭都应在收入高峰期，将至少 10% 的年结余转化为不可击穿的医疗+重疾隔离防线。</p>
    `);
    setTipModalOpen(true);
    playAudio('click', soundEnabled);
  };

  const handleRestartGame = () => {
    playAudio('click', soundEnabled);
    setGameState({
      screen: 'start',
      character: null,
      currentStageIdx: 0,
      health: 100,
      savings: 0,
      shieldLevel: 'NONE',
      historyLogs: [],
      totalCrisesHandled: 0,
      totalInsuranceClaims: 0,
      incomeLossPrevented: 0,
      avatarUrl,
    });
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-2">
          {/* Brand Left */}
          <div className="flex items-center space-x-3">
            <div>
              <LeoAvatar avatarUrl={avatarUrl} sizeClass="w-12 h-12" textClass="text-lg" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-base sm:text-lg leading-tight bg-gradient-to-r from-amber-600 via-indigo-600 to-sky-600 dark:from-amber-400 dark:via-amber-200 dark:to-sky-400 bg-clip-text text-transparent">
                  人生重置计划：30~60岁版
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-extrabold tracking-wide uppercase">
                  LEO 专研出品
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span>LEO 家庭财富传承规划师</span>
                <span className="text-amber-500">•</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  用心守护 · 传承每一个家
                </span>
              </p>
            </div>
          </div>

          {/* Controls Right */}
          <div className="flex items-center space-x-2">
            <a
              href="https://wa.me/60164311419?text=Hi%20LEO,%20我体验了你的《人生重置计划》模拟器，想向你咨询大马家庭防线配置。"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition border border-emerald-500/30 hover:shadow-sm"
              title="WhatsApp 联系 LEO"
            >
              <i className="fa-brands fa-whatsapp text-emerald-500 text-sm"></i>
              <span className="hidden sm:inline">联系 LEO (+6016-431 1419)</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                playAudio('click', next);
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <i
                className={`fa-solid ${
                  soundEnabled ? 'fa-volume-high text-amber-500' : 'fa-volume-xmark text-slate-400'
                }`}
              ></i>
              <span className="hidden sm:inline">{soundEnabled ? '音效: 开' : '音效: 关'}</span>
            </button>

            <button
              onClick={() => {
                setIsDark((prev) => !prev);
                playAudio('click', soundEnabled);
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="切换深色/浅色模式"
            >
              {isDark ? (
                <i className="fa-solid fa-sun text-amber-400"></i>
              ) : (
                <i className="fa-solid fa-moon text-indigo-600"></i>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col justify-center">
        {gameState.screen === 'start' && (
          <StartScreen avatarUrl={avatarUrl} onSelectCharacter={handleSelectCharacter} />
        )}

        {gameState.screen === 'play' && (
          <PlayScreen
            gameState={gameState}
            onMakeDecision={handleMakeDecision}
            onTriggerLeoTip={handleTriggerLeoTip}
          />
        )}

        {gameState.screen === 'result' && (
          <ResultScreen gameState={gameState} onRestartGame={handleRestartGame} />
        )}
      </main>

      {/* Footer without HTML download feature */}
      <Footer />

      {/* Leo Advice Modal */}
      <LeoTipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        avatarUrl={avatarUrl}
        content={tipContent}
      />
    </div>
  );
}

export default App;
